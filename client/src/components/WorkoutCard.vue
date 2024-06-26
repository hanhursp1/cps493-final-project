<script setup lang="ts">
import { createSummary, getActivityByID, type Activity, type Summary } from '@/model/activities';
import { postIsActive, type Post } from '@/model/posts';
import { getUser, currentUser, type User, userIsActive } from '@/model/users';
import { UserPrivilege } from '@/model/users';
import PostFooter from '@/components/PostFooter.vue'
import ActivityStats from '@/components/ActivityStats.vue';
import PrivilegeIcon from '@/components/PrivilegeIcon.vue';
import LikesView from '@/components/LikesView.vue';


const props = defineProps<{
  post: Post
}>()

const poster = getUser(props.post.posterID) as User
// This is safe since ideally this component should only exist when activityID isn't undefined
const workoutID = props.post.activityID as number
const workout = getActivityByID(workoutID)
const posterName = poster?.displayname ? poster.displayname : poster?.name.first + " " + poster?.name.last

const userPFP = poster.pfp ? poster.pfp : './users/admin.png'
const postExists = postIsActive(props.post)
</script>

<template>
  <div class="card workout" v-if="postExists && userIsActive(poster)">
    <div class="card-image" v-if="workout.photo !== undefined">
      <figure class="image is-2by1">
        <img :src="workout.photo" :alt="workout.name + ' workout photo. Posted by ' + posterName">
      </figure>
    </div>
    <div class="card-content">
      <div class="content">
        <p class="title">{{ workout.name }}</p>
        <ActivityStats :summary="createSummary(workout)" :colored-b-g="false" />
      </div>
      <hr class="workout-divider">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img class="pfp" :src="userPFP" :alt="posterName">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ posterName }} <PrivilegeIcon :poster="poster" /></p>
          <p class="subtitle is-6">@{{ poster.username }}</p>
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

.workout {
  margin-top: 10px;
  border-left: solid 4px green;
}
</style>