<template>
  <div class="menu-item-container">
    <template v-if="icon">
      <ep-icon
        v-if="icon.includes('el-icon')"
        :name="handleElIcon(icon)"
        :color="color"
        class="el-svg-icon"
      ></ep-icon>
      <svg-icon v-else :icon="icon"></svg-icon>
    </template>
    <span>{{ title }}</span>
  </div>
</template>

<script setup>
import EpIcon from '@/components/EpIcon'
import SvgIcon from '@/components/SvgIcon'
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: 'currentColor'
  }
})
const handleElIcon = (icon) => {
  let res = null
  if (icon.includes('el-icon-')) {
    res = icon.split('-')[2]
  } else {
    res = icon
  }
  return res
}
</script>

<style lang="scss" scoped></style>
