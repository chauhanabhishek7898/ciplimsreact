import {get,put,putFile,post,postFile} from '../../coreservices/apiService'
import * as environment from '../../coreservices/environment'
export default function abc() {
    return <div>abc</div>
}
export function BrandMasterPost(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/BrandMaster`
    return post(url, data).then(response => {
        return response;
    })
}
export function BrandMasterPut(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/BrandMaster`
    return put(url, data).then(response => {
        return response;
    })
}
export function BrandMaster_SelectAll() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/BrandMaster/BrandMaster_SelectAll`
    return get(url).then(response => {
        return response;
    })
}
export function BrandMaster_SelectAll_ActiveLikeSearch(vGeneric) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/BrandMaster/BrandMaster_SelectAll_ActiveLikeSearch/${vGeneric}`
    return get(url).then(response => {
        return response;
    })
}