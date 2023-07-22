import {get,put,putFile,post,postFile} from '../../coreservices/apiService'
import * as environment from '../../coreservices/environment'
export default function abc() {
    return <div>abc</div>
}
export function RoleMasterPost(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/RoleMaster`
    return post(url, data).then(response => {
        return response;
    })
}
export function RoleMasterPut(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/RoleMaster`
    return put(url, data).then(response => {
        return response;
    })
}
export function RoleMaster_SelectAll() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/RoleMaster/RoleMaster_SelectAll`
    return get(url).then(response => {
        return response;
    })
}
export function RoleMaster_SelectAll_Active() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/RoleMaster/RoleMaster_SelectAll_Active`
    return get(url).then(response => {
        return response;
    })
}