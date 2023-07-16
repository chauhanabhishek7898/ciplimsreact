import {get,put,putFile,post,postFile} from '../../coreservices/apiService'
import * as environment from '../../coreservices/environment'
export default function abc() {
    return <div>abc</div>
}
export function ProductCategoryMasterPost(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/ProductCategoryMaster`
    return post(url, data).then(response => {
        return response;
    })
}
export function ProductCategoryMasterPut(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/ProductCategoryMaster`
    return put(url, data).then(response => {
        return response;
    })
}
export function ProductCategoryMaster_SelectAll() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/ProductCategoryMaster/ProductCategoryMaster_SelectAll`
    return get(url).then(response => {
        return response;
    })
}
export function ProductCategoryMaster_ActiveLikeSearch(vGeneric) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/ProductCategoryMaster/ProductCategoryMaster_ActiveLikeSearch/${vGeneric}`
    return get(url).then(response => {
        return response;
    })
}