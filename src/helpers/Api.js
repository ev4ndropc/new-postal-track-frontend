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

  if(user_token){
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


const  Api = {
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
}

export default () => Api
