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
export function KOMonthMaster(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/KOMonthMaster`
    return api.post(url, data).then(response => {
        return response;
    })
}
// export{
//     CityMasters
// }

