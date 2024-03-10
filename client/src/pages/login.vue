<script setup lang="ts">
import { hashPassword, login } from '@/model/password'
import { LoginStatus } from '@/model/password'
import router from '@/router'
import store from '@/store'
import { ref, computed } from 'vue'

let isLoading = ref(false)
let badLogin = ref(false)
let badLoginMessage = ref("")
let username = ref("")
let password = ref("")

// Holy fuck
const validUsername = computed(
  () => username.value === "" ? undefined :
    store.state ? (store.state.usernameMap.has(username.value) ?
      true : false)
    : undefined
)

function submit() {
  isLoading.value = true
  const loginRes = login(username.value, password.value)
  switch(loginRes) {
    case LoginStatus.Ok:
      badLogin.value = false
      router.push('home')
      break
    case LoginStatus.InvalidPassword:
      badLoginMessage.value = "Incorrect passoword!"
      badLogin.value = true
      break
    case LoginStatus.InvalidUser:
      badLoginMessage.value = "User not found!"
      badLogin.value = true
      break
  }
  isLoading.value = false
}
</script>

<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column">
      <article class="message is-danger" v-if="badLogin">
        <div class="message-header">
          <p>Could not log in!</p>
          <button class="delete" aria-label="delete" @click="badLogin = false"></button>
        </div>
        <div class="mesage-body">
          {{ badLoginMessage }}
        </div>
      </article>
      <div class="field">
        <label class="label">Username</label>
        <div class="control has-icons-left">
          <input type="text" class="input" :class="{
            'is-success': validUsername === true,
            'is-danger': validUsername === false,
            '': validUsername === undefined
          }" v-model="username" placeholder="Username">
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </div>
        <p class="help is-danger" v-if="validUsername === false">Invalid username</p>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control has-icons-left">
          <input type="password" class="input" placeholder="Password" v-model="password">
          <span class="icon is-small is-left">
            <i class="fas fa-key"></i>
          </span>
        </div>
      </div>
      <div class="field">
        <div class="control" v-if="!isLoading">
          <button class="button is-link" @click="submit()">Log in</button>
        </div>
        <div v-else>
          <progress class="progress is-medium is-primary"></progress>
        </div>
      </div>
    </div>
    <div class="column"></div>
  </div>
</template>

<style scoped>

</style>