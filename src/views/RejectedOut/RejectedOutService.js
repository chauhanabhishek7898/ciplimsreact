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
    let url = `${apiUrl}/GRNMaster/GetDrainByGRNId/${nGRNId}`
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
    let url = `${apiUrl}/GRNMaster/GetDrainDetails/${FromDt}/${ToDt}/${vGeneric}`
    return get(url).then(response => {
        return response;
    })
}
export function GetExpDateForRejection(nPId,nMId) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/GRNMaster/GetExpDateForRejection/${nPId}/${nMId}`
    return get(url).then(response => {
        return response;
    })
}
export function GetBalStockForRejection(nPId,nMId,dtExpDate) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/GRNMaster/GetBalStockForRejection/${nPId}/${nMId}/${dtExpDate}`
    return get(url).then(response => {
        return response;
    })
}
export function GetBalStockForRejectionDuringEdit(nGRNId,nPId,nMId,dtExpDate) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/GRNMaster/GetBalStockForRejectionDuringEdit/${nGRNId}/${nPId}/${nMId}/${dtExpDate}`
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
export function Drain_Insert(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/GRNMaster/Drain_Insert`
    return post(url, data).then(response => {
        return response;
    })
}
export function DRAIN_Update(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/GRNMaster/DRAIN_Update`
    return put(url, data).then(response => {
        return response;
    })
}