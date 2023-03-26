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
export function GetBOMDetails(vGeneric) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/BOMMaster/GetBOMDetails/${vGeneric}`
    return api.get(url).then(response => {
        return response;
    })
}
export function GetBOMByBId(nBId) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/BOMMaster/GetBOMByBId/${nBId}`
    return api.get(url).then(response => {
        return response;
    })
}
export function BOMMasterPost(data,file) {
    let apiUrl = environment.apiUrl;
    const formData = new FormData();
    formData.append("imageFile", file)
    // formData.append("fileSize", fileSize);
    formData.append("BOMMaster", JSON.stringify(data));
    let url = `${apiUrl}/BOMMaster`
    return api.postFile(url, formData).then(response => {
        return response;
    })
}
export function BOMMasterPut(data,file) {
    let apiUrl = environment.apiUrl;
    const formData = new FormData();
    formData.append("imageFile", file)
    // formData.append("fileSize", fileSize);
    formData.append("BOMMaster", JSON.stringify(data));
    let url = `${apiUrl}/BOMMaster`
    return api.putFile(url, formData).then(response => {
        return response;
    })
}