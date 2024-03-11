<script setup lang="ts">
import type { Post } from '@/model/posts';
import { UserPrivilege, currentUser, type User } from '@/model/users';
import store from '@/store';

const props = defineProps<{
  post: Post,
  poster: User
}>()

const canEdit = (props.poster && (currentUser()?.id == props.poster?.id) && (props.poster.privilege >= UserPrivilege.PremiumUser)) ||
        (currentUser()?.privilege == UserPrivilege.Admin)
</script>

<template>
  <footer class="card-footer" v-if="store.state?.user">
    <a href="#" class="card-footer-item">Share</a>
    <a href="#" class="card-footer-item">Like</a>
    <a href="#" class="card-footer-item">Reply</a>
    <a href="#" class="card-footer-item" v-if="canEdit">Edit</a>
  </footer>
</template>

<style scoped>

</style>