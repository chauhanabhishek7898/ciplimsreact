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
export function GetGRNDetailsForReleasedMaterials(FromDt,ToDt,vGeneric) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/GRNMaster/GetGRNDetailsForReleasedMaterials/${FromDt}/${ToDt}/${vGeneric}`
    return get(url).then(response => {
        return response;
    })
}
export function GetGRNByGRNIdForReleasedMaterials(nGRNId) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/GRNMaster/GetGRNByGRNIdForReleasedMaterials/${nGRNId}`
    return get(url).then(response => {
        return response;
    })
}
export function GetBatchNoDetails(vBatchNo) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/GRNMaster/GetBatchNoDetails/${vBatchNo}`
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
export function GetBOMMaterialsQty(nBId,nBOMUnit) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/GRNMaster/GetBOMMaterialsQty/${nBId}/${nBOMUnit}`
    return get(url).then(response => {
        return response;
    })
}
export function GetExpiryDatesforMaterialRelease(nPId,nMId) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/GRNMaster/GetExpiryDatesforMaterialRelease/${nPId}/${nMId}`
    return get(url).then(response => {
        return response;
    })
}
export function GetMaterialforRelease(nPId,nMId,dtExpDate,nBId,nBOMUnit,vBatchNo) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/GRNMaster/GetMaterialforRelease/${nPId}/${nMId}/${dtExpDate}/${nBId}/${nBOMUnit}/${vBatchNo}`
    return get(url).then(response => {
        return response;
    })
}
export function GetMaterialforReleaseForEdit(nPId,nMId,dtExpDate,nBId,nBOMUnit,vBatchNo,nOutQty) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/GRNMaster/GetMaterialforReleaseForEdit/${nPId}/${nMId}/${dtExpDate}/${nBId}/${nBOMUnit}/${vBatchNo}/${nOutQty}`
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
export function MaterialRelease_Insert(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/GRNMaster/MaterialRelease_Insert`
    return post(url, data).then(response => {
        return response;
    })
}
export function BatchNo_Update(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/GRNMaster/BatchNo_Update`
    return put(url, data).then(response => {
        return response;
    })
}
export function ReleasedMaterial_Delete(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/GRNMaster/ReleasedMaterial_Delete`
    return put(url, data).then(response => {
        return response;
    })
}
export function ReleasedMaterialMaster_Update(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/GRNMaster/ReleasedMaterialMaster_Update`
    return put(url, data).then(response => {
        return response;
    })
}
export function OpeningStock_Update(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/GRNMaster/OpeningStock_Update`
    return postFile(url, data).then(response => {
        return response;
    })
}