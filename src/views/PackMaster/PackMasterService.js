import * as api from '../../coreservices/apiService'
import * as environment from '../../coreservices/environment'
export default function abc() {
    return <div>abc</div>
}
export function getKMLimitMaster_SelectAll() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/KMLimitMaster/KMLimitMaster_SelectAll`
    return api.get(url).then(response => {
        return response;
    })
}
export function getVehicleTypeMaster_SelectAll() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/VehicleTypeMaster/VehicleTypeMaster_SelectAll`
    return api.get(url).then(response => {
        return response;
    })
}
export function PackMasterPost(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/PackMaster`
    return api.post(url, data).then(response => {
        return response;
    })
}
export function PackMasterPut(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/PackMaster`
    return api.put(url, data).then(response => {
        return response;
    })
}
export function PackMaster_SelectAll() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/PackMaster/PackMaster_SelectAll`
    return api.get(url).then(response => {
        return response;
    })
}
export function UnitMaster_SelectAll() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/UnitMaster/UnitMaster_SelectAll`
    return api.get(url).then(response => {
        return response;
    })
}