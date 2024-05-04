<script setup lang="ts">
import { LoginStatus } from '@/model/users'
import { getUserID, useLogin } from '@/model/users'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';

let isLoading = ref(false)
let loginResponse = ref({
  badLogin: false,
  reason: ""
})
let username = ref("")
let password = ref("")

//TODO: Remove this
const validUsername = ref(true)

const {login, register} = useLogin()

// Submit the user's login info and display an error based on the response.
async function submit() {
  // When `isLoading` is set to true a loading bar will be displayed in place of the submission button
  // This is a placeholder for when this inevitably becomes an async function
  isLoading.value = true
  const loginRes = await login(username.value, password.value)
  switch(loginRes) {
    case LoginStatus.Ok:
      loginResponse.value.badLogin = false
      const router = useRouter()
      router.push("home")
      break
    case LoginStatus.InvalidPassword:
      loginResponse.value.reason = "Incorrect passoword!"
      loginResponse.value.badLogin = true
      break
    case LoginStatus.InvalidUser:
    loginResponse.value.reason = "User not found!"
      loginResponse.value.badLogin = true
      break
  }
  isLoading.value = false
}
</script>

<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column">
      <article class="message is-danger" v-if="loginResponse.badLogin">
        <div class="message-header">
          <p>Could not log in!</p>
          <button class="delete" aria-label="delete" @click="loginResponse.badLogin = false"></button>
        </div>
        <div class="mesage-body">
          {{ loginResponse.reason }}
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