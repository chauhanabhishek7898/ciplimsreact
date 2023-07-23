import {get,put,putFile,post,postFile} from '../../coreservices/apiService'
import * as environment from '../../coreservices/environment'
export default function abc() {
    return <div>abc</div>
}
export function BindRoleForRolePageLInkage() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/RolePageLinkage/BindRoleForRolePageLInkage`
    return get(url).then(response => {
        return response;
    })
}
export function GetPagesForRolePageLinkageByRoleId(nRoleId) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/RolePageLinkage/GetPagesForRolePageLinkageByRoleId/${nRoleId}`
    return get(url).then(response => {
        return response;
    })
}
export function GetSavedPagesForRolePageLinkageByRoleId(nRoleId) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/RolePageLinkage/GetSavedPagesForRolePageLinkageByRoleId/${nRoleId}`
    return get(url).then(response => {
        return response;
    })
}
export function GetRolePageLinkageDetails() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/RolePageLinkage/GetRolePageLinkageDetails`
    return get(url).then(response => {
        return response;
    })
}

export function  RolePageLinkagePost(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/RolePageLinkage`
    return post(url, data).then(response => {
        return response;
    })
}
export function RolePageLinkagePut(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/RolePageLinkage`
    return put(url, data).then(response => {
        return response;
    })
}