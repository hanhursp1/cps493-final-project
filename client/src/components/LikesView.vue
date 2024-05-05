<script setup lang="ts">
import LikeIcon from '@/components/LikeIcon.vue'
import type { Post } from '@/model/posts';
import { computed } from 'vue';

const props = defineProps<{
  post: Post
}>()

const firstLikes = computed(() => props.post.likedBy.slice(0, 3))
const likesOverflow = computed(() => firstLikes.value.length < props.post.likedBy.length)

</script>

<template>
  <LikeIcon v-for="like in firstLikes" :userID="like" />
  <p v-if="firstLikes.length > 0 && !likesOverflow" class="like-this">
    {{ firstLikes.length > 1 ? "Like this" : "Likes this" }}
  </p>
  <p v-else-if="likesOverflow" class="like-this">
    and {{ post.likedBy.length - firstLikes.length }} more like this
  </p>
</template>

<style scoped>
.like-this {
  display: inline-block;
  margin-left: 5px;
}
</style>