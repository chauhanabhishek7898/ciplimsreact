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