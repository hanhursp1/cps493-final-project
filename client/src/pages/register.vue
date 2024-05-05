<script setup lang="ts">
import { useLogin, type Registration, RegistrationResult } from '@/model/users';
import { computed, ref, type Ref } from 'vue';

const info: Ref<Registration> = ref({
  username: "",
  password: "",
  name: {
    first: "",
    last: ""
  }
})

const {login, register} = useLogin()

const message = ref({
  show: false,
  reason: ""
})

const confirmPassword = ref("")
const problems = ref([false, false, false, false])
const validPassword = computed(() => info.value.password == confirmPassword.value)

const isLoading = ref(false)

function fieldsAreValid() {
  // return (
  //   info.value.name.first   != "" &&
  //   info.value.name.last    != "" &&
  //   info.value.username     != "" &&
  //   info.value.password     != "" &&
  //   info.value.password === confirmPassword.value
  // )
  if (info.value.name.first == "" || info.value.name.last == "") {
    message.value.show = true
    message.value.reason = "Name cannot be empty"
    return false
  }
  if (info.value.username == "") {
    message.value.show = true
    message.value.reason = "Username cannot be empty"
    return false
  }
  if (info.value.password == "") {
    message.value.show = true
    message.value.reason = "Password cannot be empty"
    return false
  }
  if (info.value.password != confirmPassword.value) {
    message.value.show = true
    message.value.reason = "Passwords must match"
    return false
  }
  message.value.show = false
  return true
}

async function submit() {
  isLoading.value = true
  // Check all fields are valid
  if (!fieldsAreValid()) return
  const registerResponse = await register(info.value)
  switch(registerResponse) {
    case RegistrationResult.Success:
      message.value.show = false
      break
    case RegistrationResult.AlreadyExists:
      message.value.reason = "Account with that username already exists"
      message.value.show = true
    case RegistrationResult.Exception:
      message.value.reason = "An unknown exception occurred, please try again later."
      message.value.show = true
  }
  isLoading.value = false
}

</script>

<!-- <template>
  <main class="hero is-primary is-large">
    <div class="hero-body cyclist-bg">
      <div class="container">
        <h1 class="title">Register for our closed beta!</h1>
        <h2 class="subtitle">Unfortunately we are not currently accepting new users.</h2>
      </div>
    </div>
  </main>
</template> -->

<template>
  <br>
  <div class="columns">
    <div class="column"></div>
    <div class="column">
      <article class="message is-danger" v-if="message.show">
        <div class="message-header">
          <p>Could not complete registration</p>
          <button class="delete" aria-label="delete" @click="message.show = false"></button>
        </div>
        <div class="message-body">
          {{ message.reason }}
        </div>
      </article>
      <label class="label">Name</label>
      <div class="field is-horizontal">
        <div class="field-body">
          <div class="field">
            <input type="text" class="input" placeholder="First" v-model="info.name.first">
          </div>
          <div class="field">
            <input type="text" class="input" placeholder="Last" v-model="info.name.last">
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label">Username</label>
        <div class="control">
          <input type="text" class="input" v-model="info.username">
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input type="text" class="input" v-model="info.password">
        </div>
      </div>
      <div class="field">
        <label class="label">Confirm Password</label>
        <div class="control">
          <input type="text" class="input" :class="{'is-danger': !validPassword}" v-model="confirmPassword">
        </div>
        <p class="help" v-if="!validPassword">Passwords must match!</p>
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
.cyclist-bg {
  background-image: url("@/assets/bikebg.jpg");
  background-size: cover;
}
</style>