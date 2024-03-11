<script setup lang="ts">
import store from '@/store'
import router from '@/router';

import PostsView from '@/components/PostsView.vue';
import CreatePost from '@/components/CreatePost.vue'
</script>

<template>
  <div class="columns">
    <div class="column is-one-quarter"></div>
    <div class="column is-one-half">
      <br>
      <CreatePost />
      <PostsView />
    </div>
    <div class="column is-one-quarter"></div>
  </div>
</template>

<style scoped>

</style>