<template>
  <div></div>
</template>
<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
onMounted(() => {
  const { path } = route.params
  router.replace({ path: '/' + path })
})
</script>

<style lang="scss" scoped></style>
