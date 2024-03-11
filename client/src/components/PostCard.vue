<script setup lang="ts">
import type { Post } from '@/model/posts';
import { getUser, currentUser, type User } from '@/model/users';
import { UserPrivilege } from '@/model/users';
import PostFooter from './PostFooter.vue';
const props = defineProps<{
  post: Post
}>()

// This should be safe since every post should have a valid user ID attached
const poster = getUser(props.post.posterID) as User
const canEdit = (poster && (currentUser()?.id == poster?.id) && (poster.privilege >= UserPrivilege.PremiumUser)) ||
        (currentUser()?.privilege == UserPrivilege.Admin)

const posterName = poster?.displayname ? poster.displayname : poster?.name.first + " " + poster?.name.last

</script>

<template>
  <div class="card post" v-if="post !== undefined && poster !== undefined">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img class="pfp" :src="(poster && poster.pfp) ? poster.pfp : './users/admin.png'" alt="">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ posterName }}
          <span class="icon-text" v-if="poster.privilege > 0">
            <span class="icon">
              <i class="fas" :class='{
                "fa-shield-alt green": poster?.privilege === UserPrivilege.Admin,
                "fa-crown gold": poster?.privilege === UserPrivilege.PremiumUser
              }'></i>
            </span>
          </span></p>
          <p class="subtitle is-6">@{{ poster?.username }}</p>
        </div>
      </div>
      <div class="content">
        <p>{{ post.body }}</p>
      </div>
    </div>
    <PostFooter :post="post" :poster="poster" />
  </div>
</template>

<style scoped>
.pfp {
  border-radius: 50%;
  width: 48px;
  height: 48px;
  object-fit: cover;
}

.gold {
  color: gold;
}

.green {
  color: green;
}

.post {
  margin-top: 10px;
}
</style>