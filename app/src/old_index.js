/**
 * JS Project Client CV
 */
import axios from 'axios';

const baseUrl = 'http://curriculum.ale:8082/'

const user = {
  //email: 'alejandroruizlopez0@gmail.com',
  //password: 'password',
  //remember_me: true
  //
  grant_type: 'client_credentials',
  client_id: 3,
  client_secret: 'lPHg8Wr9UDtDK0i5UNnOuQuVzBbjcKIosuNjAtmK',
  scope: '*',
}

document.addEventListener('DOMContentLoaded', function () {
  console.log('Document is ready with Webpack!')

  // getTokenWithHttpRequest(url, user)
  //   .then((response) => { console.log(response) })
  //   .catch((error) => { console.log('Failed!', error) })

  // getTokenWithFetch(url, user)
  //   .then(data => { console.log(data) })
  //   .catch((error) => { console.log('Failed!', error) })

  getTokenWithAxios(user)
    .then(data => {
      //console.log(data)

      let token = data
      getDataWithAxios('api/we/' + 1, token).then(data => {
        console.log(data)
      })

      getDataWithAxios('api/studies/' + 1, token).then(data => {
        console.log(data)
      })

      getDataWithAxios('api/letters/' + 1, token).then(data => {
        console.log(data)
      })

    })
    .catch((error) => { console.log('Failed!', error) })

}) // end DOMContentLoaded

/** Getting Token withHttpRequest */
function getTokenWithHttpRequest(user) {
  return new Promise(function (resolve, reject) {
    let httpRequest = false

    if (window.XMLHttpRequest) { // Mozilla, Safari,...
      httpRequest = new XMLHttpRequest()
      if (httpRequest.overrideMimeType) {
        httpRequest.overrideMimeType('application/json')
      }
    } else if (window.ActiveXObject) { // IE
      try {
        httpRequest = new ActiveXObject('Msxml2.XMLHTTP')
      } catch (e) {
        try {
          httpRequest = new ActiveXObject('Microsoft.XMLHTTP')
        } catch (e) { }
      }
    }

    if (!httpRequest) {
      console.log('Falla :( No es posible crear una instancia XMLHTTP')
      return false
    }

    const jsonUser = JSON.stringify(user)

    // httpRequest.onreadystatechange = () => {
    //   if (httpRequest.readyState === 4) {
    //     if (httpRequest.status === 200) {
    //       console.log(JSON.parse(httpRequest.responseText))
    //     } else {
    //       console.log('Hubo problemas con la petición.')
    //     }
    //   }
    // }

    httpRequest.open('POST', baseUrl + 'auth/login', true) // method, url, async

    httpRequest.onload = () => {
      // This is called even on 404 etc
      // so check the status
      if (httpRequest.status === 200) {
        // Resolve the promise with the response text
        resolve(JSON.parse(httpRequest.response))
      } else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(httpRequest.statusText))
      }
    }
    // Handle network errors
    httpRequest.onerror = () => {
      reject(Error('Network Error'))
    }

    // Make the request
    httpRequest.setRequestHeader('Content-Type', 'application/json')
    httpRequest.send(jsonUser)
  }) // End Promise
} // End getTokenWithHttpRequest

/** Getting Token withHttpRequest. */
async function getTokenWithFetch(user) {
  // Opciones por defecto estan marcadas con un *
  const response = await fetch(baseUrl + 'auth/login', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(user) // body data type must match "Content-Type" header
  })
  return response.json() // parses JSON response into native JavaScript objects
} // End getTokenWithFetch

/** Getting Token with Axios */
async function getTokenWithAxios(user) {
  if (typeof (Storage) !== "undefined") {
    // LocalStorage disponible
    //console.log('LocalStorage disponible');
    if (localStorage.getItem('token-cv')) {
      return localStorage.getItem('token-cv')
    } else {
      try {
        //console.log('Conseguir Token')
        const res = await axios.post(baseUrl + 'oauth/token', user);
        localStorage.setItem('token-cv', res.data.access_token)
        return res.data.access_token;
      } catch (e) {
        console.error(e);
      }
    }
  } else {
    // LocalStorage no soportado en este navegador
    console.log('LocalStorage no soportado en este navegador');
  }
};

async function getDataWithAxios(url, token) {
  try {
    let request = axios.create();
    let authorization = 'Bearer ' + token
    request.defaults.headers.common['Content-Type'] = 'application/json';
    request.defaults.headers.common['Authorization'] = authorization;
    const res = await request.get(baseUrl + url);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
