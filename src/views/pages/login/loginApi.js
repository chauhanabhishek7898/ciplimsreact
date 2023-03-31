import {get} from '../../../coreservices/apiService'
import * as environment from '../../../coreservices/environment'
export default function abc() {
    return <div>abc</div>
}
export function GetUserDetailsUsingUNandPW(vUserName,vPassword,vDeviceId) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/UserMaster/GetUserDetailsUsingUNandPW/${vUserName}/${vPassword}/${null}`
    return get(url).then(response => {
        return response;
    })
}