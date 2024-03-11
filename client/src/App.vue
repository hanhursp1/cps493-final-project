<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import store from '@/store';
import { initStore } from '@/model/initialization';

if (!store.state) store.state = initStore()
</script>

<template>
  <Navbar />
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
</style>
