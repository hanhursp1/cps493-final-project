<script setup lang="ts">
import PostsView from '@/components/PostsView.vue'
import CreatePost from '@/components/CreatePost.vue'
import { ref } from 'vue';
import { isLoggedIn } from '@/model/users';
</script>

<template>
  <div class="columns">
    <div class="column is-one-quarter"></div>
    <div class="column is-one-half">
      <br>
      <CreatePost v-if="isLoggedIn()" />
      <PostsView />
    </div>
    <div class="column is-one-quarter"></div>
  </div>
</template>

<style scoped>

</style>