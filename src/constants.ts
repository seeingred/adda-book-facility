import dotenv from 'dotenv'
dotenv.config()

export const userAgent = process.env.USER_AGENT || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
// your adda.io email (if not set you will require to enter it manually in browser window)
export const email = process.env.EMAIL
// your adda.io password (if not set you will require to enter it manually in browser window)
export const password = process.env.PASSWORD
// flat ids to book for (it's better to have at least one, it will work without it probably, but I've not tested it)
export const flatIds = process.env.FLAT_IDS?.split(',').map(id => parseInt(id)) || []
// 3173 is the facility id for the squash at mg1. 3172 - is paddle court
export const facilityId = process.env.FACILITY_ID || '3173' 
// 4082 is the slot id for 9:00 for squash court in mg1
export const startingSlotId = parseInt(process.env.STARTING_SLOT_ID || '4082')
// 9 is the starting time for the slots in mg1
export const startingSlotTime = parseInt(process.env.STARTING_SLOT_TIME || '9')