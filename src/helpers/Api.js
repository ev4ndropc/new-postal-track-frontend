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


const apiFetchGet = async (endpoint, body, user_token = false) => {
  let headers = {}

  if(user_token){
    headers = {
      'Authorization': `Bearer ${user_token}`
    }

    const res = await fetch(`${BASEAPI+endpoint}`,{
      headers
    })

    const json = await res.json()

    if(json.notallowed){
      return json
    }

    return json
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

  getUserInfo:async (token) => {
    const json = await apiFetchGet(
      `/get/user_info`,
      {},
      token
    )
    return json
  },

  updateUserInfo:async (data) => {
    const json = await apiFetchPut(
      `/edit/user_info`,
      data,
      true
    )
    return json
  },

  updateStoreName:async(storeName) => {
    const json = await apiFetchPut(
      `/update/store_name?store_name=${storeName}`,
      {},
      true
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

  searchPackage:async(type, searchPackage, token) => {
    const json = await apiFetchGet(
      `/search/package?type=${type}&searchFor=${searchPackage}`,
      {},
      token
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

  deleteAllPackage:async() => {
    const json = await apiFetchDelete(
      `/delete/package/all`,
      {},
      true
    )

    return json
  },

  deleteAllDeliveredPackage:async() => {
    const json = await apiFetchDelete(
      `/delete/package/all_delivered`,
      {},
      true
    )

    return json
  },

  getPackage:async(code, token) => {
    const json = await apiFetchGet(
      `/get/package?code=${code}`,
      {},
      token
    )

    return json
  },

  getPackageInfo:async(token) => {
    const json = await apiFetchGet(
      `/package/info`,
      {},
      token
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
  },

  trackingCode:async(code, token) => {
    const json = await apiFetchGet(
      `/tracking/code?code=${code}`,
      {},
      token
    )

    return json
  },

  getSalesChannel:async (token) => {
    const json = await apiFetchGet(
      `/get/sales_channel`,
      {},
      token
    )

    return json
  },

  addSalesChannel:async (sale_channel_name) => {
    const json = await apiFetchPost(
      `/add/sales_channel?sale_channel_name=${sale_channel_name}`,
      {},
      true
    )

    return json
  },

  listCollects:async(page, searchDate, token) => {
    if(searchDate == undefined) {
      const json = await apiFetchGet(
        `/list/collects?page=${page}`,
        {},
        token
      )

      return json
    }else{
      const json = await apiFetchGet(
        `/list/collects?page=${page}&search_date=${searchDate}`,
        {},
        token
      )

      return json
    }
  },

  findCollect:async(identifier, token) => {
    const json = await apiFetchGet(
      `/find/collects?identifier=${identifier}`,
      {},
      token
    )

    return json
  },

  addCollect:async (identifier, sale_channel) => {
    const json = await apiFetchPost(
      `/add/collect?identifier=${identifier}&sale_channel=${sale_channel}`,
      {},
      true
    )

    return json
  },

  deleteCollect:async (identifier) => {
    const json = await apiFetchDelete(
      `/delete/collect?identifier=${identifier}`,
      {},
      true
    )

    return json
  },

  markAsCollected:async (identifier) => {
    const json = await apiFetchPost(
      `/mark_as_collected/collect`,
      {identifier},
      true
    )

    return json
  },

  markAsNotCollected:async (identifier) => {
    const json = await apiFetchPost(
      `/mark_as_not_collected/collect`,
      {identifier},
      true
    )

    return json
  },



}

const Api = () => ApiFunctions

export default Api
