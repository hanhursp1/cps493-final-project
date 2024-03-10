<script setup lang="ts">
import type { Post } from '@/model/posts';
import { getUser } from '@/model/users';
const props = defineProps<{
  post: Post
}>()

const poster = getUser(props.post.posterID)
</script>

<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img class="pfp" :src="(poster && poster.pfp) ? poster.pfp : './users/admin.png'" alt="">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4" v-if="poster?.displayname">{{ poster.displayname }}</p>
          <p class="title is-4" v-else>{{ poster?.name.first }} {{ poster?.name.last }}</p>
          <p class="subtitle is-6">@{{ poster?.username }}</p>
        </div>
      </div>
      <div class="content">
        <p>{{ post.body }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pfp {
  border-radius: 50%;
  width: 48px;
  height: 48px;
  object-fit: cover;
}
</style>