<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        mode="vertical"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse="isCollapse"
        :default-active="activeMenu"
      >
        <sidebar-item
          v-for="route in permissionRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import variables from '@/styles/variables.scss'
import SidebarItem from './SidebarItem.vue'
const store = useStore()
const route = useRoute()
const permissionRoutes = computed(() => store.getters.permission_routes)
const sidebar = computed(() => store.getters.sidebar)
const isCollapse = computed(() => !sidebar.value.isOpened)
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>

<style lang="scss" scoped></style>
