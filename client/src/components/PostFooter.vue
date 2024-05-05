<script setup lang="ts">
import { deletePost, likePost, likedByUser, type Post } from '@/model/posts';
import { UserPrivilege, currentUser, isLoggedIn, type User } from '@/model/users';
import { computed } from 'vue';

const props = defineProps<{
  post: Post,
  poster: User
}>()

const curUser = currentUser() as User

// Premium users can edit their posts, admins can edit anyone's posts
const canEdit = (props.poster && (curUser?.id == props.poster?.id) && (props.poster.privilege >= UserPrivilege.PremiumUser)) ||
        (curUser?.privilege == UserPrivilege.Admin)
// Users can delete their posts, admins can delete any posts
const canDelete = (props.poster && (curUser?.id == props.poster?.id) || (curUser?.privilege == UserPrivilege.Admin))

function removePost() {
  deletePost(props.post.postID)
}

const liked = computed(() => likedByUser(props.post, curUser.id))

function likeThisPost() {
  likePost(props.post, !liked.value)
}

</script>

<template>
  <footer class="card-footer" v-if="isLoggedIn()">
    <a href="#" class="card-footer-item">Share</a>
    <a href="#" class="card-footer-item" @click="likeThisPost()">
      <span class="icon">
        <i class="fa-heart" :class="{'fas': liked, 'far': !liked}"></i>
      </span>
    {{ liked ? "Liked!" : "Like" }}</a>
    <a href="#" class="card-footer-item">Reply</a>
    <a href="#" class="card-footer-item" v-if="canEdit">Edit</a>
    <a href="#" class="card-footer-item" v-if="canDelete" @click="removePost()">Delete</a>
  </footer>
</template>

<style scoped>
.liked {
  background-color: lightcyan;
  color: black;
}
</style>