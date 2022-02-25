const accessTokenKey = 'access-token'
const refreshTokenKey = 'refresh-token'
export function getAccessToken() {
  return localStorage.getItem(accessTokenKey)
}

export function setAccessToken(token) {
  return localStorage.setItem(accessTokenKey, token)
}

export function removeAccessToken() {
  return localStorage.removeItem(accessTokenKey)
}
export function getRefreshToken() {
  return localStorage.getItem(refreshTokenKey)
}

export function setRefreshToken(token) {
  return localStorage.setItem(refreshTokenKey, token)
}

export function removeRefreshToken() {
  return localStorage.removeItem(refreshTokenKey)
}
