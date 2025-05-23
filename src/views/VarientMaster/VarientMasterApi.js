import {get,put,putFile,post,postFile} from '../../coreservices/apiService'
import * as environment from '../../coreservices/environment'
export default function abc() {
    return <div>abc</div>
}
export function VarientMasterPost(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/VarientMaster`
    return post(url, data).then(response => {
        return response;
    })
}
export function VarientMasterPut(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/VarientMaster`
    return put(url, data).then(response => {
        return response;
    })
}
export function VarientMaster_SelectAll() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/VarientMaster/VarientMaster_SelectAll`
    return get(url).then(response => {
        return response;
    })
}
export function VarientMaster_ActiveLikeSearch(vGeneric) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/VarientMaster/VarientMaster_ActiveLikeSearch/${vGeneric}`
    return get(url).then(response => {
        return response;
    })
}
export function VarientMaster_SelectAll_Active() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/VarientMaster/VarientMaster_SelectAll_Active`
    return get(url).then(response => {
        return response;
    })
}