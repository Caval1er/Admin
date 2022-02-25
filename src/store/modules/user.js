import { login, getInfo } from '@/api/user'
import * as token from '@/utils/auth'
const state = () => ({
  accessToken: token.getAccessToken(),
  refreshToken: token.getRefreshToken(),
  roles: [],
  loginStatus: false
})
const mutations = {
  SET_ACCESS_TOKEN: (state, token) => {
    state.accessToken = token
  },
  SET_REFRESH_TOKEN: (state, token) => {
    state.refreshToken = token
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_LOGIN_STATUS: (state, status) => {
    state.loginStatus = status
  }
}
const actions = {
  login({ commit }, userInfo) {
    const { email, password } = userInfo
    return new Promise((resolve, reject) => {
      login({
        email,
        password
      })
        .then((data) => {
          const accessToken = data.data.accessToken
          const refreshToken = data.data.refreshToken
          commit('SET_ACCESS_TOKEN', accessToken)
          commit('SET_REFRESH_TOKEN', refreshToken)
          commit('SET_LOGIN_STATUS', true)
          token.setAccessToken(accessToken)
          token.setRefreshToken(refreshToken)
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.accessToken)
        .then((res) => {
          const { data } = res
          if (!data) {
            reject(new Error('Verification failed, please Login again.'))
          }
          const { roles } = data
          if (!roles || roles.length <= 0) {
            reject(new Error('getInfo: roles must be a non-null array'))
          }
          commit('SET_ROLES', roles)
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit('SET_ACCESS_TOKEN', '')
      commit('SET_REFRESH_TOKEN', '')
      commit('SET_ROLES', [])
      token.removeAccessToken()
      token.removeRefreshToken()
      resolve()
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
