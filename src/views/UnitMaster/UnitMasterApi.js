import { get, put, putFile, post, postFile } from '../../coreservices/apiService'
import * as environment from '../../coreservices/environment'

export default function abc() {
    return <div>abc</div>
}

export function UnitMastersPost(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/UnitMaster`
    return post(url, data).then(response => {
        return response;
    })
}

export function UnitMastersPut(data) {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/UnitMaster`
    return put(url, data).then(response => {
        return response;
    })
}

export function UnitMaster_SelectAll() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/UnitMaster/UnitMaster_SelectAll`
    return get(url).then(response => {
        return response;
    })
}

export function UnitMaster_SelectAll_Active() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/UnitMaster/UnitMaster_SelectAll_Active`
    return get(url).then(response => {
        return response;
    })
}

export function CategoryMaster_SelectAll() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/CategoryMaster/CategoryMaster_SelectAll`
    return get(url).then(response => {
        return response;
    })
}

export function SubCategoryMaster_SelectAll() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/SubCategoryMaster/SubCategoryMaster_SelectAll`
    return get(url).then(response => {
        return response;
    })
}

export function StorageConditionMaster_SelectAll_Active() {
    let apiUrl = environment.apiUrl;
    let url = `${apiUrl}/StorageConditionMaster/StorageConditionMaster_SelectAll_Active`
    return get(url).then(response => {
        return response;
    })
}