<script setup lang="ts">
import { getPosts } from '@/model/posts'
import { computed } from 'vue'

import PostCard from './PostCard.vue';
import WorkoutCard from './WorkoutCard.vue'

const posts = computed(getPosts)
</script>

<template>
  <div v-for="post in posts">
    <div v-if="post !== undefined">
    <WorkoutCard v-if="post.activityID !== undefined" :post="post" />
    <PostCard v-else :post="post" />
    </div>
  </div>
</template>

<style scoped>

</style>./PrivilegeIcon.vue