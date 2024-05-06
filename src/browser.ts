import puppeteer, { Page } from 'puppeteer'
import { email, password, userAgent } from './constants'
import path from 'path'
import { Payload } from './types'

const getPhpSessionId = async (page: Page) => {
    await page.goto('https://adda.io/login?redirect=%2Fmyadda%2Findex.php')

    let emailEntered = false
    let passwordEntered = false
    if (email && email.length) {
        await page.type('#loginEmail', email)
        emailEntered = true
    }
    if (password && password.length) {
        await page.type('#password', password)
        passwordEntered = true
    }

    // already agreed
    // await page.click('#agree_terms')

    if (emailEntered && passwordEntered) {
        await page.click('button[type="submit"]')
    }

    await page.waitForNavigation({ waitUntil: 'load' })

    const cookies = await page.cookies()
    const session = cookies.find(cookie => cookie.name === 'PHPSESSID')

    return session?.value || ''
}

const showAndGetPayload = async (page: Page) => {
    page.setDefaultNavigationTimeout(0)
    const absolutePath = path.resolve('./src/payload.html')
    await page.goto(`file://${absolutePath}`)
    const payload = await waitForSessionStorage(page, 'payload')
    return JSON.parse(payload as string)
}

const waitForSessionStorage = async (page: Page, key: string) => {
    const value = await page.evaluate(key => {
        return new Promise(resolve => {
            let intervalId = setInterval(() => {
                const newValue = window.sessionStorage.getItem(key)
                if (newValue !== null) {
                    clearInterval(intervalId)
                    resolve(newValue)
                }
            }, 100)
        })
    }, key)
    return value
}

const browser = async (): Promise<Payload> => {
    const browser = await puppeteer.launch({ headless: false }) // run browser in full mode
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 800 })
    await page.setUserAgent(userAgent)
    const payload = await showAndGetPayload(page)
    const phpSessionId = await getPhpSessionId(page)
    const fullPayload: Payload = { ...payload, phpSessionId }
    await browser.close()
    return fullPayload
}

export default browser
