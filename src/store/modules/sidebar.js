import { getSidebarOpenedStatus } from '@/utils/sidebar'

const state = () => ({
  sidebar: {
    isOpened: getSidebarOpenedStatus(),
    withoutAnimation: false
  },
  device: 'desktop'
})
const mutations = {
  TOGGLE_SIDEBAR(state) {
    state.sidebar.isOpened = !state.sidebar.isOpened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.isOpened) {
      sessionStorage.setItem('sidebarStatus', 1)
    } else {
      sessionStorage.setItem('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR(state, withoutAnimation) {
    sessionStorage.setItem('sidebarStatus', 0)
    state.sidebar.isOpened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE(state, device) {
    state.device = device
  }
}
const actions = {
  toggleSidebar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSidebar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
