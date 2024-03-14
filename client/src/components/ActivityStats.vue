<script setup lang="ts">
import type { Summary } from '@/model/activities';

const props = defineProps<{
  summary: Summary
  coloredBG: boolean
}>()

function timeFormat(seconds: number, hasSeconds: boolean = false) {
  let sec = seconds
  const s = String(Math.floor(sec % 60)).padStart(2, '0')
  sec = sec / 60
  const m = String(Math.floor(sec % 60)).padStart(2, '0')
  sec = sec / 60
  const h = String(Math.floor(sec))
  return h + ":" + m + (hasSeconds ? ":" + s : "")
}
</script>

<template>
  <div class="columns summary-info" :class="{'summary-colored': coloredBG}">
    <div class="column"><h3 class="">Calories burned: </h3><h2 class="is-primary">{{ summary.calories }}</h2></div>
    <div class="column" v-if="summary.distance"><h3 class="">Distance traveled: </h3><h2 class="is-primary">{{ summary.distance }} m</h2></div>
    <div class="column"><h3 class="">Time: </h3><h2 class="is-primary">{{ timeFormat(summary.duration) }}</h2></div>
  </div>
</template>

<style scoped>
.summary-info {
  margin: 5px;
  border-radius: 8px;
  border: solid 1px gray;
  box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.2);
}

.summary-colored {
  background-color: #00D0B1;
}

.summary-colored h3 {
  color: white;
}

.summary-colored h2 {
  color: white;
}
</style>