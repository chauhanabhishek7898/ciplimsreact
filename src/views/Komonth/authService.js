import * as api from '../../coreservices/apiService'
import * as environment from '../../coreservices/environment'
export default function abc() {
    return <div>abc</div>
}
export function CityMasters() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/CityMaster`
    return api.get(url).then(response => {
        return response;
    })
}
export function GetAllActiveStates() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/StateMaster/GetAllActiveStates`
    return api.get(url).then(response => {
        return response;
    })
}
export function GetMainInterrelatedCities() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/CityMaster/GetMainInterrelatedCities`
    return api.get(url).then(response => {
        return response;
    })
}
export function GetProfileDetails(nUserId) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/UserMaster/GetProfileDetails/${nUserId}`
    return api.get(url).then(response => {
        return response;
    })
}
export function CityMasterPost(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/CityMaster`
    return api.post(url, data).then(response => {
        return response;
    })
}
// export{
//     CityMasters
// }

