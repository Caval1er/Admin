export function hasPermission(roles, route) {
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
