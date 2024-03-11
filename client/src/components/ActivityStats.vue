<script setup lang="ts">
import type { Summary } from '@/model/activities';

const props = defineProps<{
  summary: Summary
}>()
</script>

<template>
  <div class="columns summary-info">
    <div class="column"><h3 class="">Calories burned: </h3><h2 class="is-primary">{{ summary.calories }}</h2></div>
    <div class="column"><h3 class="">Distance traveled: </h3><h2 class="is-primary">{{ summary.distance }}</h2></div>
    <div class="column"><h3 class="">Time: </h3><h2 class="is-primary">{{ summary.duration }}</h2></div>
  </div>
</template>

<style scoped>
.summary-info {
  background-color: #00D0B1;
  margin: 5px;
  border-radius: 8px;
}

.summary-info h3 {
  color: white;
}

.summary-info h2 {
  color: white;
}
</style>