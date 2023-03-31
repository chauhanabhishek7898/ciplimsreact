import {get,put,putFile,post,postFile} from '../../coreservices/apiService'
import * as environment from '../../coreservices/environment'
export default function abc() {
    return <div>abc</div>
}
export function GetStockStatus(nPId,nMId,vGeneric) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/Reports/GetStockStatus/${nPId}/${nMId}/${vGeneric}`
    return get(url).then(response => {
        return response;
    })
}