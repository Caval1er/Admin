const getters = {
  permission_routes: (state) => state.permission.routes,
  sidebar: (state) => state.sidebar.sidebar,
  device: (state) => state.sidebar.device,
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews
}

export default getters
