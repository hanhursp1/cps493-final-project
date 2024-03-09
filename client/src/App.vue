<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import store from './store';

store.user? store.user.id = 12 : store.user = {id: 12, token: ""}
</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style scoped>
</style>
