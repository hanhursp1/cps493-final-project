<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { RouterLink } from 'vue-router'
import store from '@/store';
import { UserPrivilege, currentUser, getPFP } from '@/model/users';

let isActive: Ref<boolean> = ref(false)

function toggleMenu() {
  isActive.value = !isActive.value
}

function setMenuActive(val: boolean) {
  isActive.value = val
}
</script>

<template>
<nav class="navbar is-primary" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <RouterLink to="/" class="navbar-item">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
    </RouterLink>

    <a role="button" @click="toggleMenu()" class="navbar-burger" :class="{'is-active':isActive}" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active':isActive}">
    <div class="navbar-start">
      <RouterLink to="/home" active-class="is-active" class="navbar-item">
        Home
      </RouterLink>

      <!-- <RouterLink to="/users" class="navbar-item">
        Users
      </RouterLink> -->

      <RouterLink to="/my-stats" active-class="is-active" class="navbar-item" v-if="store.state?.user">
        My Stats
      </RouterLink>

      <RouterLink to="/admin" active-class="is-active" class="navbar-item" v-if="currentUser()?.privilege == UserPrivilege.Admin">
        Admin Portal
      </RouterLink>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          More
        </a>

        <div class="navbar-dropdown">
          <RouterLink to="/about" class="navbar-item">
            About
          </RouterLink>
          <!-- <a class="navbar-item">
            Jobs
          </a>
          <a class="navbar-item">
            Contact
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item">
            Report an issue
          </a> -->
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item" v-if="!store.state?.user">
        <div class="buttons">
          <RouterLink to="/register" class="button is-primary">
            <strong>Sign up</strong>
          </RouterLink>
          <RouterLink to="/login" class="button is-light">
            Log in
          </RouterLink>
        </div>
      </div>
      <div class="navbar-item" v-else>
        <p>{{ currentUser()?.username }}</p>
        <hr width="2" size="32" style="margin: 0px 5px 0px 5px;">
        <figure class="image is-32x32">
          <img class="pfp" :src="getPFP(currentUser())" alt="">
        </figure>
      </div>
    </div>
  </div>
</nav>
</template>

<style scoped>
.router-link-exact-active {
  border-bottom: 2px solid #00D2B4;
}

.router-link-active {
  border-bottom: 2px solid #00d2b3;
}

.pfp {
  border-radius: 50%;
  object-fit: cover;
  width: 32px;
  height:32px;
}
</style>