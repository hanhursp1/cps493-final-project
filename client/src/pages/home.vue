<script setup lang="ts">
import store from '@/store'
if (!store.state?.user) {
  router.push('/')
}
</script>

<template>
  <div>

  </div>
</template>

<style scoped>

</style>