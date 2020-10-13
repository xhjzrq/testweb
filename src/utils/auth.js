import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const ContextUser = 'Context-User'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUser() {
  return Cookies.get(ContextUser)
}

export function setUser(token) {
  return Cookies.set(ContextUser, token)
}

export function removeUser() {
  return Cookies.remove(ContextUser)
}
