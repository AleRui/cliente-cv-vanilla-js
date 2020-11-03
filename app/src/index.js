/**
 * JS Project Client CV
 */
import { getTokenWithAxios, getDataWithAxios } from './services/service-api-cv'

/* CSS */
import 'bootstrap';
import './scss/style.scss'

document.addEventListener('DOMContentLoaded', function () {
  getTokenWithAxios()
    .then(token => {
      if (token !== '' && token !== undefined && token !== null) {
        getDataWithAxios('api/usercv/' + 1, token).then(data => {
          console.log(data)
        })
      } else {
        throw new Error('Invalid Token')
      }
    })
    .catch((error) => { console.log('Failed!', error) })
})
