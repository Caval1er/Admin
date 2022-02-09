import store from './store'
import router from './router'
let count = 0
router.beforeEach(async (to) => {
  if (count === 1) {
    return true
  } else {
    try {
      const roles = ['editor']
      const accessedRoutes = await store.dispatch(
        'permission/generateRoutes',
        roles
      )
      accessedRoutes.forEach((route) => {
        router.addRoute(route)
      })
      count = 1
      return { path: to.fullPath, replace: true }
    } catch (error) {}
  }
})
