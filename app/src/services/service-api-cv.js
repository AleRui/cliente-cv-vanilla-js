/**
 * Service API CV
 */

import axios from 'axios'

const baseUrl = 'https://aleruizcv.herokuapp.com/'

const user = {
  grant_type: 'client_credentials',
  client_id: 21,
  client_secret: '7lS2UsAvMJgjODNa6jUMWtrC1CYot06QvJLA3Cfa',
  scope: '*'
}

/** Getting Token with Axios */
export async function getTokenWithAxios () {
  if (
    (typeof (Storage) !== 'undefined') &&
    localStorage.getItem('token-cv') !== '' &&
    localStorage.getItem('token-cv') !== undefined &&
    localStorage.getItem('token-cv') !== null
  ) {
    return localStorage.getItem('token-cv')
  }
  try {
    const res = await axios.post(baseUrl + 'oauth/token', user)
    localStorage.setItem('token-cv', res.data.access_token)
    return res.data.access_token
  } catch (e) {
    console.error(e)
  }
}

export async function getDataWithAxios (url, token) {
  try {
    const request = axios.create()
    request.defaults.headers.common['Content-Type'] = 'application/json'
    request.defaults.headers.common.Authorization = 'Bearer ' + token
    const res = await request.get(baseUrl + url)
    return res.data
  } catch (e) {
    console.error(e)
  }
}