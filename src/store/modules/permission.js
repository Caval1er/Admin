import { constantRoutes, asyncRoutes } from '@/router/index'

/**
 * 使用meta.role判断当前用户是否有访问路由的权限
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 根据role通过递归过滤异步路由表
 */

export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        // 递归过滤子路由
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      // 子路由过滤完后将过滤结果放入res中
      res.push(tmp)
    }
  })
  return res
}

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
