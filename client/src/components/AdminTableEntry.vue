<script setup lang="ts">
import { removeUser, getConcatName, type User } from '@/model/users';
import store from '@/store';

const props = defineProps<{
  user: User
}>()

const userPFP = props.user.pfp ? props.user.pfp : './users/admin.png'

function deleteUser() {
  if (store.state) {
    if (store.state && store.state.user && store.state.user.id == props.user.id) {
      alert("Cannot remove yourself!")
      return
    } 
    removeUser(props.user.id)
  }
}

function editUser() {
  // Unimplemented right now
  return
}

</script>

<template>
  <tr v-if="user !== undefined">
    <td><figure class="image is-48x48"><img :src="userPFP"></figure></td>
    <td>{{ user.username }}</td>
    <td>{{ getConcatName(user) }}</td>
    <td><button class="button" @click="deleteUser()">Delete User</button></td>
    <td><button class="button" @click="editUser()">Edit User</button></td>
  </tr>
</template>

<style scoped>

</style>