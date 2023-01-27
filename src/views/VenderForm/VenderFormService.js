import * as api from '../../coreservices/apiService'
import * as environment from '../../coreservices/environment'
export default function abc() {
    return <div>abc</div>
}
export function VendorMasterPost(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/VendorMaster`
    return api.post(url, data).then(response => {
        return response;
    })
}
export function VendorMasterPut(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/VendorMaster`
    return api.put(url, data).then(response => {
        return response;
    })
}
export function VendorMaster_SelectAll() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/VendorMaster/VendorMaster_SelectAll`
    return api.get(url).then(response => {
        return response;
    })
}