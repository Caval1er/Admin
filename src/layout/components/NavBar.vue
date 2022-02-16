<template>
  <div class="navbar">
    <hamburger
      class="hamburger-container"
      @toggleClick="toggleSideBar"
      :is-active="sidebar.isOpened"
    />
    <Breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="40"
            src="https://avatars.githubusercontent.com/u/59830398?v=4"
          >
          </el-avatar>
          <svg-icon icon="caret-bottom" className="caret-bottom"></svg-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>主页</el-dropdown-item>
            </router-link>
            <a target="__blank" href="#">
              <el-dropdown-item> 博客主页 </el-dropdown-item>
            </a>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
const store = useStore()
// sideBar
function toggleSideBar() {
  store.dispatch('sidebar/toggleSidebar')
}
const sidebar = computed(() => store.getters.sidebar)
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f6f6f6;
  .right-menu {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
  }
  .hamburger-container {
    cursor: pointer;
    transition: background 0.3s;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .breadcrumb-container {
    width: calc(100% - 142px);
  }
  :deep(.avatar-container) {
    cursor: pointer;
    .avatar-wrapper {
      position: relative;
      .el-avatar {
        margin-right: 8px;
      }
      .caret-bottom {
        font-size: 12px;
      }
      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }
}
</style>
