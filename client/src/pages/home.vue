<script setup lang="ts">
import store from '@/store'
import router from '@/router';

import PostsView from '@/components/PostsView.vue';

if (!store.state?.user) {
  // router.push('/')
}
</script>

<template>
  <div>
    <PostsView />
  </div>
</template>

<style scoped>

</style>