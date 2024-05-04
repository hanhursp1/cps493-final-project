<script setup lang="ts">
import { removeUser, getConcatName, type User, currentUser, userIsActive } from '@/model/users';

const props = defineProps<{
  user: User
}>()

const userPFP = props.user.pfp ? props.user.pfp : './users/admin.png'

function deleteUser() {
  if (currentUser()?.id == props.user.id) {
    alert("Cannot remove yourself!")
    return
  } 
  removeUser(props.user.id)
}

function editUser() {
  // Unimplemented right now
  return
}

</script>

<template>
  <tr v-if="userIsActive(user)">
    <td><figure class="image is-48x48"><img :src="userPFP"></figure></td>
    <td>{{ user.username }}</td>
    <td>{{ getConcatName(user) }}</td>
    <td><button class="button" @click="deleteUser()">Delete User</button></td>
    <td><button class="button" @click="editUser()">Edit User</button></td>
  </tr>
</template>

<style scoped>

</style>