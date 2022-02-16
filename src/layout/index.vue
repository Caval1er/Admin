<template>
  <div class="app-wrapper" :class="classObj">
    <div
      v-if="device === 'mobile' && sidebar.isOpened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <!-- 左侧menu -->
    <Sidebar class="sidebar-container"></Sidebar>
    <div class="main-container hasTagsView">
      <div class="fixed-header">
        <!-- 顶部navbar -->
        <nav-bar />
        <tags-view></tags-view>
      </div>
      <!-- 内容区 -->
      <app-main></app-main>
    </div>
  </div>
</template>

<script setup>
// import ResizeMixin from './mixin/ResizeHandler'
import { computed } from 'vue'
import NavBar from './components/NavBar.vue'
import Sidebar from './components/Sidebar'
import AppMain from './components/AppMain.vue'
import TagsView from './components/TagsView'
import { useStore } from 'vuex'
import Resize from './mixin/ResizeHandler'
Resize()
const store = useStore()
const sidebar = computed(() => store.getters.sidebar)
const device = computed(() => store.getters.device)
const handleClickOutside = () => {
  store.dispatch('sidebar/closeSidebar', { withoutAnimation: false })
}
const classObj = computed(() => ({
  hideSidebar: !sidebar.value.isOpened,
  mobile: device.value === 'mobile',
  withoutAnimation: sidebar.value.withoutAnimation
}))
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
}
.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}
.mobile .fixed-header {
  width: 100%;
}
</style>
