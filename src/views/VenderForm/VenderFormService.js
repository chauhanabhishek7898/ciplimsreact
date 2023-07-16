import {get,put,putFile,post,postFile} from '../../coreservices/apiService'
import * as environment from '../../coreservices/environment'
export default function abc() {
    return <div>abc</div>
}
export function VendorMasterPost(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/VendorMaster`
    return post(url, data).then(response => {
        return response;
    })
}
export function VendorMasterPut(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/VendorMaster`
    return put(url, data).then(response => {
        return response;
    })
}
export function VendorMaster_SelectAll_Active() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/VendorMaster/VendorMaster_SelectAll_Active`
    return get(url).then(response => {
        return response;
    })
}
export function VendorMaster_SelectAll() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/VendorMaster/VendorMaster_SelectAll`
    return get(url).then(response => {
        return response;
    })
}
export function VendorMaster_SelectAll_ActiveLikeSearch(vGeneric) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/VendorMaster/VendorMaster_SelectAll_ActiveLikeSearch/${vGeneric}`
    return get(url).then(response => {
        return response;
    })
}
export function MaterialMaster_SelectAll_ActiveLikeSearch(vGeneric) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/CategoryMaster/CategoryMaster_ActiveLikeSearch/${vGeneric}`
    return get(url).then(response => {
        return response;
    })
}
export function SubCategory_SelectAll_ActiveLikeSearch(vGeneric) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/SubCategoryMaster/SubCategoryMaster_ActiveLikeSearch/${vGeneric}`
    return get(url).then(response => {
        return response;
    })
}


