<template>
  <el-scrollbar>
    <div class="tags-view-container">
      <router-link
        v-for="(tag, index) in visitedViews"
        :key="tag.path"
        :to="tag.fullPath"
        :class="{ active: isActive(tag) }"
        class="tags-view-item"
      >
        <el-tag
          effect="dark"
          :closable="tag.meta && !tag.meta.affix"
          @close.prevent.stop="closeSelectedTag({ index, view: tag })"
          >{{ tag.title }}</el-tag
        >
      </router-link>
    </div>
  </el-scrollbar>
  <div class="tags-dropdown-container">
    <el-dropdown @command="handleCommand">
      <div class="el-dropdown-link">
        <svg-icon icon="operation"></svg-icon>
        <el-link type="primary" :underline="false">更多操作</el-link>
        <ep-icon name="ArrowDown"></ep-icon>
      </div>
      <template #dropdown>
        <el-dropdown-item command="refresh"
          ><svg-icon icon="refresh"></svg-icon
          ><span class="title">刷新页面</span></el-dropdown-item
        >
        <el-dropdown-item command="closeOthers"
          ><svg-icon icon="circle-close"></svg-icon
          ><span class="title">关闭其他</span></el-dropdown-item
        >
        <el-dropdown-item command="closeAll"
          ><svg-icon icon="circle-close"></svg-icon
          ><span class="title">关闭全部</span></el-dropdown-item
        >
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import EpIcon from '@/components/EpIcon'
import SvgIcon from '@/components/SvgIcon'
import path from 'path'
import { computed, nextTick, onMounted, watch, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
// 调用 store,route
const store = useStore()
const route = useRoute()
const router = useRouter()
const affixTag = ref([])
const isActive = (tag) => {
  return tag.fullPath === route.fullPath
}
const filterAffixTags = (routes, basePath = '/') => {
  let tags = []
  routes.forEach((route) => {
    const tagPath = path.resolve(basePath, route.path)
    if (route.meta && route.meta.affix) {
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta }
      })
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, tagPath)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}
const initTag = (route) => {
  const affixTags = filterAffixTags(route)
  affixTag.value = affixTags
  for (const tag of affixTags) {
    store.dispatch('tagsView/addVisitedView', tag)
  }
}
const addTag = (tag) => {
  store.dispatch('tagsView/addView', tag)
}
const closeSelectedTag = (payload) => {
  store.dispatch('tagsView/delView', payload).then(({ visitedViews }) => {
    if (isActive(payload.view)) {
      toLastTag(visitedViews)
    }
  })
}
const toLastTag = (visitedViews) => {
  const latestTag = visitedViews[visitedViews.length - 1]
  if (latestTag) {
    router.push(latestTag.fullPath)
  }
}

const freshTag = (route) => {
  const { fullPath, meta, path, query, params, name } = route
  const view = { fullPath, meta, path, query, params, name }
  store.dispatch('tagsView/delCachedView', view).then((res) => {
    const { fullPath } = view
    nextTick(() => {
      router.replace({
        path: '/redirect' + fullPath
      })
    })
  })
}
const closeOthers = (route) => {
  const { fullPath, meta, path, query, params, name } = route
  const view = { fullPath, meta, path, query, params, name }
  store.dispatch('tagsView/delOtherView', view).then(() => {})
}
const closeAll = (route) => {
  store.dispatch('tagsView/delAllViews', route).then(({ visitedViews }) => {
    if (affixTag.value.some((tag) => tag.path === route.path)) {
      return
    }
    toLastTag(visitedViews, route)
  })
}
const handleCommand = (command) => {
  switch (command) {
    case 'refresh': {
      freshTag(route)
      break
    }
    case 'closeOthers': {
      closeOthers(route)
      break
    }
    case 'closeAll': {
      closeAll(route)
      break
    }
  }
}
// mapGetters
const visitedViews = computed(() => store.getters.visitedViews)
const permissionRoutes = computed(() => store.getters.permission_routes)
// watch
watch(route, (to, from) => {
  if (!from.path.startsWith('/redirect/')) {
    const { fullPath, meta, path, query, params, name } = to
    const view = { fullPath, meta, path, query, params, name }
    addTag(view)
  }
})
// 生命周期函数
onMounted(() => {
  initTag(permissionRoutes.value)
  addTag(route)
})
</script>

<style lang="scss" scoped>
.tags-view-container {
  display: flex;
  height: 34px;
  width: calc(100% - 104px);
  background: #fff;
  align-items: center;
  .tags-view-item {
    flex-shrink: 0;
    height: 24px;
    margin-left: 5px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    .el-tag {
      border-width: 1px;
      border-style: solid;
      border-color: #d8dce5;
      background-color: #fff;
      color: #495060;
      :deep(.el-tag__close) {
        color: #495060;
      }
    }
    &.active {
      .el-tag {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        :deep(.el-tag__close) {
          color: #fff;
        }
      }
      :deep(.el-tag__content)::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        line-height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 6px;
      }
    }
  }
}
.tags-dropdown-container {
  position: absolute;
  top: 60px;
  right: 15px;
  cursor: pointer;
  .el-dropdown-link {
    display: flex;
    align-items: center;
    color: var(--el-color-primary);
    .el-link {
      padding-right: 5px;
    }
  }
}
</style>
<style>
.el-dropdown-menu__item {
  justify-content: space-between;
}
</style>
