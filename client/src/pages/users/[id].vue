<script setup lang="ts">
import { apiGet, useRedirect } from '@/model/fetch';
import { getUser, getUserWithAPI, type User } from '@/model/users';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
console.log(route.params.id)

const user = ref(null as unknown as User)

getUserWithAPI(Number(route.params.id)).then( res =>{
  user.value = res
}).catch(err => {
  useRedirect().redirect("")
})

</script>

<template>
  <div class = "card post" v-if="user">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-128x128">
            <img class="pfp" :src="(user && user.pfp) ? ('/' + user.pfp ): '/users/admin.png'">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ user.name.first }} {{ user.name.last }} <PrivilegeIcon :poster="user" /></p>
          <p class="subtitle is-6">@{{ user?.username }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>