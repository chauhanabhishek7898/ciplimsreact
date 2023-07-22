import { post } from '../../coreservices/apiService'
import * as environment from '../../coreservices/environment'
export default function abc() {
    return <div>abc</div>
}
export function UserMasterPost(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/UserMaster`
    return post(url, data).then(response => {
        return response;
    })
}
// export function UserMasterPut(data) {
//     let apiUrl = environment.apiUrl;
//     let url = `${apiUrl}/UserMaster`
//     return put(url, data).then(response => {
//         return response;
//     })
// }
// export function UserMaster_SelectAll() {
//     let apiUrl = environment.apiUrl;
//     let url = `${apiUrl}/UserMaster/UserMaster_SelectAll`
//     return get(url).then(response => {
//         return response;
//     })
// }
// export function UserMaster_SelectAll_ActiveLikeSearch(vGeneric) {
//     let apiUrl = environment.apiUrl;
//     let url = `${apiUrl}/UserMaster/UserMaster_SelectAll_ActiveLikeSearch/${vGeneric}`
//     return get(url).then(response => {
//         return response;
//     })
// }