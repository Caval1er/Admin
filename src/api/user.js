import request from '@/utils/request'
export const login = (data) => {
  return request({
    url: 'user/login',
    method: 'POST',
    data
  })
}

export const getInfo = () => {
  return request({
    url: 'user/info',
    method: 'GET'
  })
}

export const autoLogin = (refreshToken) => {
  return request({
    url: 'user/auto-login',
    method: 'POST',
    data: {
      refreshToken
    }
  })
}
