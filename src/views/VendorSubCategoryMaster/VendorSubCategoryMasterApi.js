import {get,put,putFile,post,postFile} from '../../coreservices/apiService'
import * as environment from '../../coreservices/environment'
export default function abc() {
    return <div>abc</div>
}

export function UnitMastersPost(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/SubCategoryMaster`
    return post(url, data).then(response => {
        return response;
    })
}
export function UnitMastersPut(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/SubCategoryMaster`
    return put(url, data).then(response => {
        return response;
    })
}
export function UnitMaster_SelectAll() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/SubCategoryMaster/SubCategoryMaster_SelectAll`
    return get(url).then(response => {
        return response;
    })
}
export function UnitMaster_SelectAll_Active() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/SubCategoryMaster/SubCategoryMaster_SelectAll_Active`
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