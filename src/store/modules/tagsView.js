import { getTitle } from '@/utils/tagsView'
const state = () => ({
  visitedViews: JSON.parse(sessionStorage.getItem('tagsView')) || [],
  cachedViews: []
})
const mutations = {
  ADD_VISITED_VIEW(state, view) {
    if (state.visitedViews.some((v) => v.path === view.path)) return
    state.visitedViews.push({ ...view, title: getTitle(view) })
    sessionStorage.setItem('tagsView', JSON.stringify(state.visitedViews))
  },
  ADD_CACHED_VIEW(state, view) {
    if (!view.name && state.cachedViews.includes(view.name)) return
    state.cachedViews.push(view.name)
  },
  DEL_VISITED_VIEW(state, index) {
    state.visitedViews.splice(index, 1)
  },
  DEL_CACHED_VIEW(state, view) {
    const index = state.cachedViews.indexOf(view.name)
    index > -1 && state.cachedViews.splice(index, 1)
  }
}
const actions = {
  addView({ dispatch }, view) {
    dispatch('addVisitedView', view)
    dispatch('addCachedView', view)
  },
  addVisitedView({ commit }, view) {
    commit('ADD_VISITED_VIEW', view)
  },
  addCachedView({ commit }, view) {
    commit('ADD_CACHED_VIEW', view)
  },
  delView({ dispatch }, payload) {
    return new Promise((resolve) => {
      Promise.all([
        dispatch('delVisitedView', payload.index),
        dispatch('delCachedView', payload.view)
      ]).then((res) => {
        console.log([...res[0]])
        resolve({
          visitedViews: [...res[0]],
          cachedViews: [...res[1]]
        })
      })
    })
  },
  delVisitedView({ commit, state }, index) {
    return new Promise((resolve) => {
      commit('DEL_VISITED_VIEW', index)
      resolve([...state.visitedViews])
    })
  },
  delCachedView({ commit, state }, view) {
    return new Promise((resolve) => {
      commit('DEL_CACHED_VIEW', view)
      resolve([...state.cachedViews])
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
