<script setup lang="ts">
import PostWriter from '@/components/PostWriter.vue'
import DimScreen from '@/components/DimScreen.vue'
import { ref } from 'vue'


const isWorkout = ref(false)
const postWriterActive = ref(false)
</script>

<template>
  <DimScreen :is-active="postWriterActive" />
  <div class="field has-addons centered">
    <p class="control">
      <button class="button" @click="isWorkout = false; postWriterActive = true">
        New Post
      </button>
    </p>
    <p class="control">
      <button class="button" @click="isWorkout = true; postWriterActive = true">
        New Workout
      </button>
    </p>
  </div>
  <PostWriter :is-workout="isWorkout" :is-active="postWriterActive" @exit="postWriterActive = false" />
</template>

<style scoped>
.centered {
  margin: auto;
  width: fit-content;
}
</style>