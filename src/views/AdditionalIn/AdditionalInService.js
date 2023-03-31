import {get,put,putFile,post,postFile} from '../../coreservices/apiService'
import * as environment from '../../coreservices/environment'
export default function abc() {
    return <div>abc</div>
}
export function PlantMaster_SelectAll() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/PlantMaster/PlantMaster_SelectAll`
    return get(url).then(response => {
        return response;
    })
}
export function GetGRNDetails(FromDt,ToDt,vGeneric) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/GRNMaster/GetGRNDetails/${FromDt}/${ToDt}/${vGeneric}`
    return get(url).then(response => {
        return response;
    })
}
export function GetAdditionalInByGRNId(nGRNId) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/GRNMaster/GetAdditionalInByGRNId/${nGRNId}`
    return get(url).then(response => {
        return response;
    })
}

export function GetPODetailsLIkeSearch(vGeneric) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/GRNMaster/GetPODetailsLIkeSearch/${vGeneric}`
    return get(url).then(response => {
        return response;
    })
}
export function GetAdditionalInDetails(FromDt,ToDt,vGeneric) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/GRNMaster/GetAdditionalInDetails/${FromDt}/${ToDt}/${vGeneric}`
    return get(url).then(response => {
        return response;
    })
}
export function POMasterPost(data,file) {
    let apiUrl = environment.apiUrl;
    const formData = new FormData();
    formData.append("imageFile", file)
    // formData.append("fileSize", fileSize);
    formData.append("GRNMaster", JSON.stringify(data));
    let url = `${apiUrl}/GRNMaster`
    return postFile(url, formData).then(response => {
        return response;
    })
}
export function AdditionalIn_Insert(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/GRNMaster/AdditionalIn_Insert`
    return post(url, data).then(response => {
        return response;
    })
}
export function AdditionalIn_Update(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/GRNMaster/AdditionalIn_Update`
    return put(url, data).then(response => {
        return response;
    })
}