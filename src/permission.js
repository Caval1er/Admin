import store from './store'
import router from './router'
import { getAccessToken, getRefreshToken } from '@/utils/auth'
import { autoLogin } from '@/api/user'
const whiteList = ['/login']
router.beforeEach(async (to) => {
  const accessToken = getAccessToken()
  const refreshToken = getRefreshToken()
  const loginStatus = store.getters.login_status
  if (refreshToken && !loginStatus) {
    try {
      await autoLogin(refreshToken)
      const { roles } = await store.dispatch('user/getInfo')
      const accessedRoutes = await store.dispatch(
        'permission/generateRoutes',
        roles
      )
      accessedRoutes.forEach((route) => {
        router.addRoute(route)
      })
      store.commit('user/SET_LOGIN_STATUS', true)
      return { path: to.fullPath, replace: true }
    } catch (error) {
      await store.dispatch('user/resetToken')
      return { path: '/login', query: { redirect: to.path } }
    }
  } else {
    if (accessToken) {
      if (to.path === '/login') {
        return { path: '/' }
      } else {
        const hasRoles = store.getters.roles && store.getters.roles.length > 0
        if (hasRoles) {
          return true
        } else {
          try {
            const { roles } = await store.dispatch('user/getInfo')
            const accessedRoutes = await store.dispatch(
              'permission/generateRoutes',
              roles
            )
            accessedRoutes.forEach((route) => {
              router.addRoute(route)
            })
            return { path: to.fullPath, replace: true }
          } catch (error) {
            await store.dispatch('user/resetToken')
            return { path: '/login', query: { redirect: to.path } }
          }
        }
      }
    } else {
      // 没有token
      if (whiteList.indexOf(to.path) !== -1) {
        return true
      } else {
        return { path: '/login', query: { redirect: to.path } }
      }
    }
  }
})
