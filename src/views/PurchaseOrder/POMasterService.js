import * as api from '../../coreservices/apiService'
import * as environment from '../../coreservices/environment'
export default function abc() {
    return <div>abc</div>
}
export function PlantMaster_SelectAll() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/PlantMaster/PlantMaster_SelectAll`
    return api.get(url).then(response => {
        return response;
    })
}
export function GetPODetails(FromDt,ToDt,vGeneric) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/POMaster/GetPODetails/${FromDt}/${ToDt}/${vGeneric}`
    return api.get(url).then(response => {
        return response;
    })
}
export function GetPOByPOId(nPOId) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/POMaster/GetPOByPOId/${nPOId}`
    return api.get(url).then(response => {
        return response;
    })
}
export function POMasterPost(data,file) {
    let apiUrl = environment.apiUrl;
    const formData = new FormData();
    formData.append("imageFile", file)
    // formData.append("fileSize", fileSize);
    formData.append("POMaster", JSON.stringify(data));
    let url = `${apiUrl}/POMaster`
    return api.postFile(url, formData).then(response => {
        return response;
    })
}
export function POMasterPut(data,file) {
    let apiUrl = environment.apiUrl;
    const formData = new FormData();
    formData.append("imageFile", file)
    // formData.append("fileSize", fileSize);
    formData.append("POMaster", JSON.stringify(data));
    let url = `${apiUrl}/POMaster`
    return api.putFile(url, formData).then(response => {
        return response;
    })
}