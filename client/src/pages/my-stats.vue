<script setup lang="ts">
import store from '@/store';
import router from '@/router';

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