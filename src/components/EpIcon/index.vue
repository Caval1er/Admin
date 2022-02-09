<template>
  <i>
    <el-icon :color="color">
      <component :is="ElIcons[name]" :style="iconStyle" />
    </el-icon>
  </i>
</template>

<script setup>
import {} from 'vue'
import * as ElIcons from '@element-plus/icons'
defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'currentColor'
  },
  iconStyle: {
    type: Object,
    default: () => {}
  }
})
</script>

<style lang="scss" scoped></style>
