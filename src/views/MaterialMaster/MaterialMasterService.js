import {get,put,putFile,post,postFile} from '../../coreservices/apiService'
import * as environment from '../../coreservices/environment'
export default function abc() {
    return <div>abc</div>
}
export function MaterialMasterPost(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/MaterialMaster`
    return postFile(url, data).then(response => {
        return response;
    })
}
export function MaterialMasterPut(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/MaterialMaster`
    return postFile(url, data).then(response => {
        return response;
    })
}
export function MaterialMaster_SelectAll() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/MaterialMaster/MaterialMaster_SelectAll`
    return get(url).then(response => {
        return response;
    })
}
export function MaterialMaster_SelectAll_ActiveLikeSearch(vGeneric) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/MaterialMaster/MaterialMaster_SelectAll_ActiveLikeSearch/${vGeneric}`
    return get(url).then(response => {
        return response;
    })
}