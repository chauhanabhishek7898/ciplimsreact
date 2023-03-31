import {get,put,putFile,post,postFile} from '../../coreservices/apiService'
import * as environment from '../../coreservices/environment'
export default function abc() {
    return <div>abc</div>
}
export function GodownMasterPost(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/GodownMaster`
    return post(url, data).then(response => {
        return response;
    })
}
export function GodownMasterPut(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/GodownMaster`
    return put(url, data).then(response => {
        return response;
    })
}
export function GodownMaster_SelectAll() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/GodownMaster/GodownMaster_SelectAll`
    return get(url).then(response => {
        return response;
    })
}