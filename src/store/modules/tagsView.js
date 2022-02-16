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
    if (!view.name || state.cachedViews.includes(view.name)) return
    if (view.meta && !view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },
  DEL_VISITED_VIEW(state, index) {
    state.visitedViews.splice(index, 1)
  },
  DEL_CACHED_VIEW(state, view) {
    const index = state.cachedViews.indexOf(view.name)
    index > -1 && state.cachedViews.splice(index, 1)
  },
  DEL_OTHER_VISITED_VIEW(state, view) {
    // state.visitedViews.forEach((tag, index) => {
    //   if (!tag.meta.affix && tag.path !== view.path) {
    //     state.visitedViews.splice(index, 1)
    //   }
    // })
    state.visitedViews = state.visitedViews.filter(
      (v) => v.meta.affix || v.path === view.path
    )
  },
  DEL_OTHER_CACHED_VIEW(state, view) {
    const index = state.cachedViews.indexOf(view.name)
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1)
    } else {
      // if index = -1, there is no cached tags
      state.cachedViews = []
    }
  },
  DEL_ALL_VISITED_VIEWS: (state) => {
    // keep affix tags
    const affixTags = state.visitedViews.filter((tag) => tag.meta.affix)
    state.visitedViews = affixTags
  },
  DEL_ALL_CACHED_VIEWS: (state) => {
    state.cachedViews = []
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
  },
  delOtherView({ dispatch }, view) {
    return new Promise((resolve) => {
      Promise.all([
        dispatch('delOthersVisitedViews', view),
        dispatch('delOthersCachedViews', view)
      ]).then((res) => {
        resolve({
          visitedViews: [...res[0]],
          cachedViews: [...res[1]]
        })
      })
    })
  },
  delOthersVisitedViews({ commit, state }, view) {
    return new Promise((resolve) => {
      commit('DEL_OTHER_VISITED_VIEW', view)
      resolve([...state.visitedViews])
    })
  },
  delOthersCachedViews({ commit, state }, view) {
    return new Promise((resolve) => {
      commit('DEL_OTHER_CACHED_VIEW', view)
      resolve([...state.cachedViews])
    })
  },
  delAllViews({ dispatch, state }, view) {
    return new Promise((resolve) => {
      Promise.all([
        dispatch('delAllVisitedViews', view),
        dispatch('delAllCachedViews', view)
      ]).then((res) => {
        resolve({
          visitedViews: [...res[0]],
          cachedViews: [...res[1]]
        })
      })
    })
  },
  delAllVisitedViews({ commit, state }) {
    return new Promise((resolve) => {
      commit('DEL_ALL_VISITED_VIEWS')
      resolve([...state.visitedViews])
    })
  },
  delAllCachedViews({ commit, state }) {
    return new Promise((resolve) => {
      commit('DEL_ALL_CACHED_VIEWS')
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
