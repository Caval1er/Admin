const getters = {
  permission_routes: (state) => state.permission.routes,
  sidebar: (state) => state.sidebar.sidebar,
  device: (state) => state.sidebar.device,
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,
  roles: (state) => state.user.roles,
  login_status: (state) => state.user.loginStatus,
  access_token: (state) => state.user.accessToken,
  refresh_token: (state) => state.user.refreshToken
}

export default getters
