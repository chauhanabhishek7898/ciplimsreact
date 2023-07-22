import {get,put,putFile,post,postFile} from '../../coreservices/apiService'
import * as environment from '../../coreservices/environment'
export default function abc() {
    return <div>abc</div>
}
export function PageMasterPost(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/PageMaster`
    return post(url, data).then(response => {
        return response;
    })
}
export function PageMasterPut(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/PageMaster`
    return put(url, data).then(response => {
        return response;
    })
}
export function PageMaster_SelectAll() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/PageMaster/PageMaster_SelectAll`
    return get(url).then(response => {
        return response;
    })
}
export function PageMaster_SelectAll_Active() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/PageMaster/PageMaster_SelectAll_Active`
    return get(url).then(response => {
        return response;
    })
}
export function PageMaster_ActiveLikeSearch(vGeneric) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/PageMaster/PageMaster_ActiveLikeSearch/${vGeneric}`
    return get(url).then(response => {
        return response;
    })
}