<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { isExternal } from '@/utils/validate'
const props = defineProps({
  to: {
    type: String,
    required: true
  }
})
const isExternalFlag = computed(() => isExternal(props.to))
const type = computed(() => {
  if (isExternalFlag.value) {
    return 'a'
  }
  return 'router-link'
})
const linkProps = (to) => {
  if (isExternalFlag.value) {
    return {
      href: to,
      target: '_blank',
      rel: 'noopener'
    }
  } else {
    return {
      to
    }
  }
}
</script>

<style lang="scss" scoped></style>
