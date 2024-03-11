<script setup lang="ts">
import { deletePost, type Post } from '@/model/posts';
import { UserPrivilege, currentUser, type User } from '@/model/users';
import store from '@/store';

const props = defineProps<{
  post: Post,
  poster: User
}>()

// Premium users can edit their posts, admins can edit anyone's posts
const canEdit = (props.poster && (currentUser()?.id == props.poster?.id) && (props.poster.privilege >= UserPrivilege.PremiumUser)) ||
        (currentUser()?.privilege == UserPrivilege.Admin)
// Users can delete their posts, admins can delete any posts
const canDelete = (props.poster && (currentUser()?.id == props.poster?.id) || (currentUser()?.privilege == UserPrivilege.Admin))

function removePost() {
  deletePost(props.post.postID)
}
</script>

<template>
  <footer class="card-footer" v-if="store.state?.user">
    <a href="#" class="card-footer-item">Share</a>
    <a href="#" class="card-footer-item">Like</a>
    <a href="#" class="card-footer-item">Reply</a>
    <a href="#" class="card-footer-item" v-if="canEdit">Edit</a>
    <a href="#" class="card-footer-item" v-if="canDelete" @click="removePost()">Delete</a>
  </footer>
</template>

<style scoped>

</style>