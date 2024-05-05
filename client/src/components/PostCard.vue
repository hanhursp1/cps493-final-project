<script setup lang="ts">
import { postIsActive, type Post } from '@/model/posts';
import { getUser, currentUser, type User, userIsActive } from '@/model/users';
import { UserPrivilege } from '@/model/users';
import PrivilegeIcon from '@/components/PrivilegeIcon.vue'
import PostFooter from '@/components/PostFooter.vue';
import { computed, ref } from 'vue';
import LikeIcon from '@/components/LikeIcon.vue';
import LikesView from '@/components/LikesView.vue';
const props = defineProps<{
  post: Post
}>()

const postExists = postIsActive(props.post)

// I'm gonna leave this comment here, since it ended up being
// hilariously prophetic:
// "This should be safe since every post should have a valid user ID attached"

// For some reason this function was returning a Post???? Instead of a User????
// Javascript is just a spaghetti factory, I hate this
const poster = getUser(props.post.posterID) as User
const canEdit = (poster && (currentUser()?.id == poster?.id) && (poster.privilege >= UserPrivilege.PremiumUser)) ||
        (currentUser()?.privilege == UserPrivilege.Admin)

const posterName = poster?.displayname ? poster.displayname : poster?.name.first + " " + poster?.name.last

</script>

<template>
  <div class="card post" v-if="postExists && userIsActive(poster)">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img class="pfp" :src="(poster && poster.pfp) ? poster.pfp : './users/admin.png'" alt="">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ posterName }} <PrivilegeIcon :poster="poster" /></p>
          <p class="subtitle is-6">@{{ poster?.username }}</p>
        </div>
      </div>
      <div class="content">
        <p>{{ post.body }}</p>
      </div>
      <LikesView :post="post" />
    </div>
    <PostFooter :post="post" :poster="poster" />
  </div>
</template>

<style scoped>
.post {
  margin-top: 10px;
}
</style>