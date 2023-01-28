import * as api from '../../coreservices/apiService'
import * as environment from '../../coreservices/environment'
export default function abc() {
    return <div>abc</div>
}
export function GetProfileDetails(nUserId) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/UserMaster/GetProfileDetails/${nUserId}`
    return api.get(url).then(response => {
        return response;
    })
}
export function KOMonth_SelectAll() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/KOMonthMaster/KOMonth_SelectAll`
    return api.get(url).then(response => {
        return response;
    })
}
export function KOMonth_SelectAllMonthView() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/KOMonthMaster/KOMonth_SelectAllMonthView`
    return api.get(url).then(response => {
        return response;
    })
}
export function KOMonth_SelectAllWeekWise(nKOId) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/KOMonthMaster/KOMonth_SelectAllWeekWise/${nKOId}`
    return api.get(url).then(response => {
        return response;
    })
}
export function KOMonthMaster(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/KOMonthMaster`
    return api.post(url, data).then(response => {
        return response;
    })
}
export function KOMonthMasterPut(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/KOMonthMaster`
    return api.put(url, data).then(response => {
        return response;
    })
}
export function KOMonthMaster_Update(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/KOMonthMaster/KOMonthMaster_Update`
    return api.put(url, data).then(response => {
        return response;
    })
}
// export{
//     CityMasters
// }

