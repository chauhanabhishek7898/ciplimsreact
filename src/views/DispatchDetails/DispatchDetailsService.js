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
export function GetDispatchById(nDSId) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/DispatchMaster/GetDispatchById/${nDSId}`
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
export function GetDispatchDetails(FromDt,ToDt,vGeneric) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/DispatchMaster/GetDispatchDetails/${FromDt}/${ToDt}/${vGeneric}`
    return get(url).then(response => {
        return response;
    })
}
export function DispatchMasterPost(data,file) {
    let apiUrl = environment.apiUrl;
    const formData = new FormData();
    formData.append("imageFile", file)
    // formData.append("fileSize", fileSize);
    formData.append("DispatchMaster", JSON.stringify(data));
    let url = `${apiUrl}/DispatchMaster`
    return postFile(url, formData).then(response => {
        return response;
    })
}
export function DispatchMasterPut(data,file) {
    let apiUrl = environment.apiUrl;
    const formData = new FormData();
    formData.append("imageFile", file)
    // formData.append("fileSize", fileSize);
    formData.append("DispatchMaster", JSON.stringify(data));
    let url = `${apiUrl}/DispatchMaster`
    return putFile(url, formData).then(response => {
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