import {get,put,putFile,post,postFile} from '../../coreservices/apiService'
import * as environment from '../../coreservices/environment'
export default function abc() {
    return <div>abc</div>
}

export function UserMobileNo_Update(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/UserMaster/UserMobileNo_Update`
    return put(url, data).then(response => {
        return response;
    })
}
export function UserEmailId_Update(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/UserMaster/UserEmailId_Update`
    return put(url, data).then(response => {
        return response;
    })
}
export function UserChangePassword_Update(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/UserMaster/UserChangePassword_Update`
    return put(url, data).then(response => {
        return response;
    })
}

