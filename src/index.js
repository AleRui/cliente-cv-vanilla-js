console.log('Funcionando Webpack')

document.addEventListener('DOMContentLoaded', function () {
  console.log('Document is ready!')

  var httpRequest = false

  const url = 'http://curriculum.ale:8082/api/auth/login'

  const user = {
    email: 'alejandroruizlopez0@gmail.com',
    password: 'password',
    remember_me: true
  }

  hacerRequest(url, user)
})

function hacerRequest (url, user) {
  httpRequest = false

  if (window.XMLHttpRequest) { // Mozilla, Safari,...
    httpRequest = new XMLHttpRequest()
    if (httpRequest.overrideMimeType) {
      httpRequest.overrideMimeType('text/xml')
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
    alert('Falla :( No es posible crear una instancia XMLHTTP')
    return false
  }

  httpRequest.onreadystatechange = obteniendoContenido
  httpRequest.open('POST', url, JSON.stringify(user), true) // method, url, async
  httpRequest.setRequestHeader('Content-Type', 'application/json')
  httpRequest.send(user)
}

function obteniendoContenido () {
  if (httpRequest.readyState === 4) {
    if (httpRequest.status === 200) {
      console.log(httpRequest.responseText)
    } else {
      console.log('Hubo problemas con la petición.')
    }
  }
}
