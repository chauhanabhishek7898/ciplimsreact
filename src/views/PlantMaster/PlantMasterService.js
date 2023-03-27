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
export function PlantMaster_SelectAll_ActiveLikeSearch(vGeneric) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/PlantMaster/PlantMaster_SelectAll_ActiveLikeSearch/${vGeneric}`
    return get(url).then(response => {
        return response;
    })
}

export function PlantMasterPost(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/PlantMaster`
    return postFile(url, data).then(response => {
        return response;
    })
}
export function PlantMasterPut(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/PlantMaster`
    return postFile(url, data).then(response => {
        return response;
    })
}