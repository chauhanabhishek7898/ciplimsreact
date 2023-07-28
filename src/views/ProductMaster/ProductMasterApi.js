import { get, put, putFile, post, postFile } from '../../coreservices/apiService'
import * as environment from '../../coreservices/environment'

export default function abc() {
    return <div>abc</div>
}

export function ProductMasterPost(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/ProductMaster`
    return post(url, data).then(response => {
        return response;
    })
}

export function ProductMasterPut(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/ProductMaster`
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
export function ProductMaster_SelectAll() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/ProductMaster/ProductMaster_SelectAll`
    return get(url).then(response => {
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
export function GetProductSubCategory(nPDCId) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/ProductSubCategoryMaster/GetProductSubCategory/${nPDCId}`
    return get(url).then(response => {
        return response;
    })
}

export function ProductMaster_SelectAll_Active() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/ProductMaster/ProductMaster_SelectAll_Active`
    return get(url).then(response => {
        return response;
    })
}