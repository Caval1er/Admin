import axios from 'axios'
import store from '@/store'
import { getAccessToken } from './auth'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    if (store.getters.access_token) {
      config.headers.Authorization = `Bearer ${getAccessToken()}`
    }
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code !== 0) {
      // do something
      return Promise.reject(new Error(res.message || '请求失败'))
    } else {
      return res
    }
  },
  (error) => {
    let message = error.message || '请求失败'
    if (error.response && error.response.data) {
      const { data } = error.response
      message = data.message
      if (data.code === 401) {
        // 处理token的问题
        console.log('token失效', message)
      }
    }
    return Promise.reject(error)
  }
)
export default service
