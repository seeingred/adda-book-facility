import axios from 'axios'
import { userAgent, facilityId, startingSlotId, startingSlotTime } from './constants'



const calculateSlot = (localTime: number) => {
    const slotId = startingSlotId + localTime - startingSlotTime
    return slotId
}

const book = async (phpSessionId: string, date: string, localTime: number, flatId: number) => {
    const utfTime = localTime - 3
    const slotId = calculateSlot(localTime)
    const options = {
        method: 'GET',
        url: 'https://adda.io/ajax/post_facility.php',
        params: { action: 'bookFacility', selected_facility_id: facilityId },
        headers: {
            cookie: `PHPSESSID=${phpSessionId}`,
            'content-type': 'application/json;charset=UTF-8',
            'user-agent': userAgent
        },
        data: {
            facilityId: facilityId,
            bookDate: date,
            bookTimeFrom: `${utfTime}:00`,
            bookTimeTo: `${utfTime + 1}:00`,
            slot: `${localTime}:00:00,${localTime + 1}:00:00,0.00,${slotId}`,
            isCommunity: false,
            flatId: flatId.toString(),
            comment: '',
            facilityAvailable: true,
            min: '',
            hrs: '',
            book_hours: 1,
            book_mins: 0,
            book_time: '01:00:00',
            limit_time1: '00:00:00',
            limit_time2: '24:00:00',
            msg: '',
            flag: '',
            multiDays: 0,
            book_start_time: '',
            book_end_time: '',
            fac_book_type: '2',
            facility_service_tax: 0,
            refundableDeposit: '0.00',
            day_wise_enabled: '0'
        }
    }

    const response = await axios
        .request(options)
    return response.data
}

export default book
