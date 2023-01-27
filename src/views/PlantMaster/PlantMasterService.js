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

export function PlantMasterPost(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/PlantMaster`
    return api.post(url, data).then(response => {
        return response;
    })
}
export function PlantMasterPut(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/PlantMaster`
    return api.put(url, data).then(response => {
        return response;
    })
}