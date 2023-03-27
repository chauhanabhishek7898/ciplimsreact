import {get,put,putFile,post,postFile} from '../../coreservices/apiService'
import * as environment from '../../coreservices/environment'
export default function abc() {
    return <div>abc</div>
}
export function LineMasterPost(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/LineMaster`
    return postFile(url, data).then(response => {
        return response;
    })
}
export function LineMasterPut(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/LineMaster`
    return postFile(url, data).then(response => {
        return response;
    })
}
export function LineMaster_SelectAll() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/LineMaster/LineMaster_SelectAll`
    return get(url).then(response => {
        return response;
    })
}