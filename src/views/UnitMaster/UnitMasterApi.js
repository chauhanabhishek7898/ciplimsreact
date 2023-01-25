import * as api from '../../coreservices/apiService'
import * as environment from '../../coreservices/environment'
export default function abc() {
    return <div>abc</div>
}

export function UnitMastersPost(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/UnitMaster`
    return api.post(url, data).then(response => {
        return response;
    })
}
export function UnitMastersPut(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/UnitMaster`
    return api.put(url, data).then(response => {
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