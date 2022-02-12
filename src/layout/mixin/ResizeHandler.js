import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, onBeforeMount, onBeforeUnmount, onMounted, watch } from 'vue'
const { body } = document
const WIDTH = 992
export default function Resize() {
  const store = useStore()
  const route = useRoute()
  const sidebar = computed(() => store.getters.sidebar)
  const device = computed(() => store.getters.device)
  function isMobile() {
    const rect = body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }
  function resizeHandler() {
    if (!document.hidden) {
      const isMobileFlag = isMobile()
      store.dispatch(
        'sidebar/toggleDevice',
        isMobileFlag ? 'mobile' : 'desktop'
      )
      if (isMobileFlag) {
        store.dispatch('sidebar/closeSidebar', { withoutAnimation: true })
      }
    }
  }
  watch(route, () => {
    if (device.value === 'mobile' && sidebar.value.isOpened) {
      store.dispatch('sidebar/closeSidebar', { withoutAnimation: false })
    }
  })
  onBeforeMount(() => {
    window.addEventListener('resize', resizeHandler)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler)
  })
  onMounted(() => {
    const isMobileFlag = isMobile()
    if (isMobileFlag) {
      store.dispatch('sidebar/toggleDevice', 'mobile')
      store.dispatch('sidebar/closeSidebar', { withoutAnimation: true })
    }
  })
}
