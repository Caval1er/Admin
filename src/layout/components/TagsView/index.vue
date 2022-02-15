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
</template>

<script setup>
import path from 'path'
import { computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
// 调用 store,route
const store = useStore()
const route = useRoute()
const router = useRouter()
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
  for (const tag of affixTags) {
    store.dispatch('tagsView/addVisitedView', tag)
  }
}
const addTag = (tag) => {
  store.dispatch('tagsView/addView', tag)
}
const closeSelectedTag = (payload) => {
  store.dispatch('tagsView/delView', payload).then(({ visitedViews }) => {
    toLastTag(visitedViews)
  })
}
const toLastTag = (visitedViews) => {
  const latestTag = visitedViews[visitedViews.length - 1]
  if (latestTag) {
    router.push(latestTag.fullPath)
  }
}
// mapGetters
const visitedViews = computed(() => store.getters.visitedViews)
const permissionRoutes = computed(() => store.getters.permission_routes)
// watch
watch(route, (to) => {
  const { fullPath, meta, path, query, params, name } = to
  const view = { fullPath, meta, path, query, params, name }
  addTag(view)
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
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
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
</style>
