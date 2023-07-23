import { post, get, put } from '../../coreservices/apiService'
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
export function UpdateUserStatus(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/UserMaster/UpdateUserStatus`
    return put(url, data).then(response => {
        return response;
    })
}
export function GetAllUserDetails() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/UserMaster/GetAllUserDetails`
    return get(url).then(response => {
        return response;
    })
}