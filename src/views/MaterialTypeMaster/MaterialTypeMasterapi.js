import {get,put,putFile,post,postFile} from '../../coreservices/apiService'
import * as environment from '../../coreservices/environment'
export default function abc() {
    return <div>abc</div>
}
export function MaterialTypeMasterPost(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/MaterialTypeMaster`
    return post(url, data).then(response => {
        return response;
    })
}
export function MaterialTypeMasterPut(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/MaterialTypeMaster`
    return put(url, data).then(response => {
        return response;
    })
}
export function MaterialTypeMaster_SelectAll() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/MaterialTypeMaster/MaterialTypeMaster_SelectAll`
    return get(url).then(response => {
        return response;
    })
}
export function MaterialTypeMaster_ActiveLikeSearch(vGeneric) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/MaterialTypeMaster/MaterialTypeMaster_ActiveLikeSearch/${vGeneric}`
    return get(url).then(response => {
        return response;
    })
}