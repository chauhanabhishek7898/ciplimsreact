import {get,put,putFile,post,postFile} from '../../coreservices/apiService'
import * as environment from '../../coreservices/environment'
export default function abc() {
    return <div>abc</div>
}
export function ProductSubCategoryMasterPost(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/ProductSubCategoryMaster`
    return post(url, data).then(response => {
        return response;
    })
}
export function ProductSubCategoryMasterPut(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/ProductSubCategoryMaster`
    return put(url, data).then(response => {
        return response;
    })
}
export function ProductSubCategoryMaster_SelectAll() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/ProductSubCategoryMaster/ProductSubCategoryMaster_SelectAll`
    return get(url).then(response => {
        return response;
    })
}
export function ProductSubCategoryMaster_ActiveLikeSearch(vGeneric) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/ProductSubCategoryMaster/ProductSubCategoryMaster_ActiveLikeSearch/${vGeneric}`
    return get(url).then(response => {
        return response;
    })
}
export function GetProductSubCategory(nPDCId) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/ProductSubCategoryMaster/GetProductSubCategory/${nPDCId}`
    return get(url).then(response => {
        return response;
    })
}