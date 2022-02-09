<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNested }"
        >
          <Item
            :icon="onlyOneChild.meta.icon"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-sub-menu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <Item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </template>

      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nested="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nested-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script setup>
// import { ref } from 'vue'
import path from 'path'
import { isExternal } from '@/utils/validate'
import AppLink from './Link'
import Item from './Item'
// let onlyOneChild = null
// const onlyOneChild = ref(null)
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isNested: {
    type: Boolean,
    default: false
  },
  basePath: {
    type: String,
    default: ''
  }
})
const resolvePath = (routePath) => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return path.resolve(props.basePath, routePath)
}
</script>
<script>
export default {
  data() {
    this.onlyOneChild = null
    return {}
  },
  methods: {
    // 是否只有一个路由需要展示
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          // 如果hidden为true,表示此路由不显示在侧边栏
          return false
        } else {
          // 当只有一个子路由需要展示时,这个中间量才有用
          this.onlyOneChild = item
          return true
        }
      })

      // 如果只有一个子路由,默认展示子路由
      if (showingChildren.length === 1) {
        return true
      } else if (showingChildren.length === 0) {
        // 没有子路由展示时，展示父路由
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    }
  }
}
</script>
<style lang="scss" scoped></style>
