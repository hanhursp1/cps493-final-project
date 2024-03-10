<script setup lang="ts">
import { getPosts } from '@/model/posts'
import store from '@/store'
import { computed } from 'vue'

import PostCard from './PostCard.vue';

const posts = computed(getPosts)
</script>

<template>
  <div class="columns">
    <div class="column is-one-quarter"></div>
    <div class="column is-half">
      <div v-for="post in posts" :key="post.postID">
        <PostCard :post="post" />
      </div>
    </div>
    <div class="column is-one-quarter"></div>
  </div>
</template>

<style scoped>

</style>