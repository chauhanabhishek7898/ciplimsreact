export default function abc() {
    return <div>abc</div>
}
export async function get(url) {
     let token = await localStorage.getItem('token');
return fetch(url, {
        headers: {
            'Authorization': `Bearer ${token} `,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            return response;
        })
        .catch(err => {
            // alert(err)
            console.log(err);
        });
}
export async function post(url, data) {
     let token = await localStorage.getItem('token');
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token} `,
            'Content-Type': 'application/json',
            "accept": "application/json"
        },
        body: JSON.stringify(data)
    };
    return fetch(url, requestOptions)
        .then(response => response.json())
        .then(response => {
            return response;
        })
        .catch(err => {
            console.log(err);
        });
}
export async function put(url, data) {
  let token = await localStorage.getItem('token');
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token} `,
        },
        body: JSON.stringify(data)
    };
    return fetch(url, requestOptions)
        .then(response => response.json())
        .then(response => {
       
            return response;
        })
        .catch(err => {
      
            console.log(err);
        });
}
export async function postFile(url, data) {
let token = await localStorage.getItem('token');
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token} `,
            // 'Content-Type': 'multipart/form-data'
        },
        body: data
    };
    return fetch(url, requestOptions)
        .then(response => response.json())
        .then(response => {
            return response;
        })
        .catch(err => {
            console.log(err);
        });
}
export async function putFile(url, data) {
  let token = await localStorage.getItem('token');
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token} `,
            // 'Content-Type': 'multipart/form-data'
        },
        body: data
    };
    return fetch(url, requestOptions)
        .then(response => response.json())
        .then(response => {
            return response;
        })
        .catch(err => {
            // alert(err)
            console.log(err);
        });
}
// module.exports = { get, post, put, postFile, putFile } 