import { constantRoutes, asyncRoutes } from '@/router/index'
import { filterAsyncRoutes } from '@/utils/router'

const state = () => ({
  routes: [], // 过滤后的路由列表
  addRoutes: [] // 加入的有权限的路由
})

const mutations = {
  SET_ROUTES(state, routes) {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ state, commit }, roles) {
    return new Promise((resolve) => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      console.log(state.addRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
