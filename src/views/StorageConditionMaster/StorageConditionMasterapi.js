import {get,put,putFile,post,postFile} from '../../coreservices/apiService'
import * as environment from '../../coreservices/environment'
export default function abc() {
    return <div>abc</div>
}
export function StorageConditionMasterPost(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/StorageConditionMaster`
    return post(url, data).then(response => {
        return response;
    })
}
export function StorageConditionMasterPut(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/StorageConditionMaster`
    return put(url, data).then(response => {
        return response;
    })
}
export function StorageConditionMaster_SelectAll() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/StorageConditionMaster/StorageConditionMaster_SelectAll`
    return get(url).then(response => {
        return response;
    })
}
export function StorageConditionMaster_ActiveLikeSearch(vGeneric) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/StorageConditionMaster/StorageConditionMaster_ActiveLikeSearch/${vGeneric}`
    return get(url).then(response => {
        return response;
    })
}