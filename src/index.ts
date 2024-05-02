
import { flatIds } from './constants'
import book from './book'
import browser from './browser'

const main = async () => {
    const payload = await browser()
    const dateSplitted = payload.date.split('-')
    const dateForBook = `${dateSplitted[2]}-${dateSplitted[1]}-${dateSplitted[0]}`
    let usedFlatIds: number[] = []
    for (let i = 0; i < payload.hours; i++) {
        const bookTime = payload.time + i
        let flatId = flatIds.shift()
        if (!flatId) {
            flatId = usedFlatIds[0] || 1
            do {
                flatId = flatId + 1
            } while (usedFlatIds.includes(flatId) || flatIds.includes(flatId))
        }
        usedFlatIds.push(flatId)
        console.log(`------------------`)
        console.log(`Session id:  `, payload.phpSessionId)
        console.log(`Date for booking:  `, dateForBook)
        console.log(`Flat id:  `, flatId)
        console.log(`Book time:  `, bookTime)
        const res = await book(payload.phpSessionId, dateForBook, bookTime, flatId)
        console.log(`Response:  `, res)
        console.log(`------------------`)
    }
}

main()
