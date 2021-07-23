import Cookies from 'js-cookie'
import config from '../config'

let BASEAPI

if(config.DEVELOPMENT_MODE){
  BASEAPI = config.DEVELOPMENT_BASEURL
}else{
  BASEAPI = config.DEPLOY_BASEURL
}


const apiFetchPost = async (endpoint, body, user_token = false) => {
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  if(user_token == true){
    let token = Cookies.get('token')
    headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  const res = await fetch(BASEAPI+endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  })

  const json = await res.json()

  if(json.notallowed){
    window.location.href = '/auth/signin'
    return
  }

  return json
}


const apiFetchGet = async (endpoint, user_token = false) => {
  let headers = {}

  if(user_token){
    let token = Cookies.get('token')
    headers = {
      'Authorization': `Bearer ${token}`
    }
  }

  const res = await fetch(`${BASEAPI+endpoint}`,{
    headers
  })

  const json = await res.json()

  if(json.notallowed){
    window.location.href = '/auth/signin'
    return
  }

  return json
}

const apiFetchPut = async (endpoint, body, user_token = false) => {
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  if(user_token == true){
    let token = Cookies.get('token')
    headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  const res = await fetch(BASEAPI+endpoint, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body)
  })

  const json = await res.json()

  if(json.notallowed){
    window.location.href = '/auth/signin'
    return
  }

  return json
}

const apiFetchDelete = async (endpoint, body, user_token = false) => {
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  if(user_token == true){
    let token = Cookies.get('token')
    headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  const res = await fetch(BASEAPI+endpoint, {
    method: 'DELETE',
    headers,
    body: JSON.stringify(body)
  })

  const json = await res.json()

  if(json.notallowed){
    window.location.href = '/auth/signin'
    return
  }

  return json
}


const  ApiFunctions = {
  signin:async(email, password) => {
    const json = await apiFetchPost(
      '/auth/signin',
      { email, password },
    )

    return json
  },


  signup:async (name, email, password, phone) => {
    const json = await apiFetchPost(
      '/auth/signup',
      { name, email, password, phone_number: phone }
    )
    return json
  },

  addPackage:async(clientName, clientNumber, code) => {
    const json = await apiFetchPost(
      '/add/package',
      { client_name: clientName, client_number: clientNumber, code },
      true
    )
    return json
  },

  deletePackage:async(id) => {
    const json = await apiFetchDelete(
      `/delete/package?id=${id}`,
      {},
      true
    )

    return json
  },

  getPackage:async(code) => {
    const json = await apiFetchGet(
      `/get/package?code=${code}`,
      {},
      true
    )

    return json
  },

  listPackage:async(page) => {
    const json = await apiFetchGet(
      `/list/package?page=${page}`,
      {},
      true
    )

    return json
  },

  editPackage:async(data) => {
    const json = await apiFetchPut(
      `/edit/package`,
      data,
      true
    )

    return json
  }


}

const Api = () => ApiFunctions

export default Api
