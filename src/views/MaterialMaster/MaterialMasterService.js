import { get, put, putFile, post, postFile } from '../../coreservices/apiService'
import * as environment from '../../coreservices/environment'
export default function abc() {
    return <div>abc</div>
}
export function MaterialMasterPost(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/MaterialMaster`
    return post(url, data).then(response => {
        return response;
    })
}
export function MaterialMasterPut(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/MaterialMaster`
    return put(url, data).then(response => {
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
export function GetSubCategory(nCId) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/SubCategoryMaster/GetSubCategory/${nCId}`
    return get(url).then(response => {
        return response;
    })
}

export function MaterialTypeMaster_SelectAll_Active() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/MaterialTypeMaster/MaterialTypeMaster_SelectAll_Active`
    return get(url).then(response => {
        return response;
    })
}