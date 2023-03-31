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
export function GetGRNByGRNId(nGRNId) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/GRNMaster/GetOpeningByGRNId/${nGRNId}`
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
export function GetOpeningDetails(vGeneric) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/GRNMaster/GetOpeningDetails/${vGeneric}`
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
export function OpeningStock_Insert(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/GRNMaster/OpeningStock_Insert`
    return post(url, data).then(response => {
        return response;
    })
}
export function OpeningStock_Update(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/GRNMaster/OpeningStock_Update`
    return put(url, data).then(response => {
        return response;
    })
}