<script setup lang="ts">
const props = defineProps<{
  isActive: boolean
}>()
</script>

<template>
  <div class="screen-dimmer" :class="{'active': isActive}">
  </div>
</template>

<style scoped>
  .screen-dimmer {
    display: none;
  }

  .screen-dimmer.active {
    display: inline;
    position: fixed;
    padding: 0;
    margin: 0;
    z-index: 16;

    top: 0;
    left: 0;



    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
</style>