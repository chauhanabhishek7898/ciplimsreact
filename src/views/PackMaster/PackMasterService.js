import {get,put,putFile,post,postFile} from '../../coreservices/apiService'
import * as environment from '../../coreservices/environment'
export default function abc() {
    return <div>abc</div>
}
export function PackMasterPost(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/PackMaster`
    return postFile(url, data).then(response => {
        return response;
    })
}
export function PackMasterPut(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/PackMaster`
    return postFile(url, data).then(response => {
        return response;
    })
}
export function PackMaster_SelectAll() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/PackMaster/PackMaster_SelectAll`
    return get(url).then(response => {
        return response;
    })
}
export function UnitMaster_SelectAll() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/UnitMaster/UnitMaster_SelectAll`
    return get(url).then(response => {
        return response;
    })
}
export function PackMaster_SelectAll_ActiveLikeSearch(vGeneric) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/PackMaster/PackMaster_SelectAll_ActiveLikeSearch/${vGeneric}`
    return get(url).then(response => {
        return response;
    })
}