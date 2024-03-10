<script setup lang="ts">
import { getPosts } from '@/model/posts';
import store from '@/store'
import { computed } from 'vue';

const posts = computed(getPosts)
</script>

<template>
  <div>

  </div>
</template>

<style scoped>

</style>