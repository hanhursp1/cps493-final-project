<script setup lang="ts">
import router from '@/router';
import { UserPrivilege, currentUser, getUsers } from '@/model/users';
import AdminTableEntry from '@/components/AdminTableEntry.vue'

if (currentUser()?.privilege != UserPrivilege.Admin) {
  router.push('/')
}
</script>

<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>Profile</th>
          <th>Handle</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody v-for="user in getUsers()">
        <AdminTableEntry :user="user" />
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>