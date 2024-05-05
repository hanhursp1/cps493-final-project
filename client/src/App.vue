<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/NavbarComponent.vue'
import store from '@/store';
import { initStore } from '@/model/initialization';

if (!store.state) {
  initStore().then(state => {
    console.log("store.state initialized!")
    store.state = state
    console.log(store.state)
  })
}
</script>

<template>
  <Navbar />
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
</style>
