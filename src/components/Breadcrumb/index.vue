<template>
  <el-breadcrumb :separator-icon="ArrowRight" class="breadcrumb">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in BreadcrumbList"
        :key="item.path"
      >
        <span
          v-if="
            item.redirect === 'noRedirect' ||
            index === BreadcrumbList.length - 1
          "
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <router-link v-else :to="handleLink(item)">{{
          item.meta.title
        }}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
const route = useRoute()
const BreadcrumbList = ref([])
const isDashboard = (route) => {
  if (!route) {
    return false
  }
  const name = route.name
  if (!name) {
    return false
  }
  return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
}
const getBreadcrumb = () => {
  let matched = route.matched.filter((item) => item.meta && item.meta.title)
  const first = matched[0]
  if (!isDashboard(first)) {
    matched = [{ path: '/dashboard', meta: { title: 'Dashboard' } }].concat(
      matched
    )
  }
  BreadcrumbList.value = matched
}
const handleLink = (item) => {
  const { redirect, path } = item
  const link = redirect || path
  return link
}
onMounted(() => {
  getBreadcrumb()
})
watch(route, () => {
  getBreadcrumb()
})
</script>

<style lang="scss" scoped></style>
