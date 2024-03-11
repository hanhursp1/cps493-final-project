<script setup lang="ts">
import store from '@/store';
import router from '@/router';
import { getUser, type User } from '@/model/users';
import type { Activity, Summary } from '@/model/activities';
import ActivityStats from '@/components/ActivityStats.vue'

if (!store.state?.user) {
  router.push('/')
}

const user = store.state?.user ? store.state.user.userData : getUser(3) as User
const userActivities = user.activities
  .map((id) => store.state?.activities[id])
  .filter((act) => act !== undefined) as Activity[]

function reductionFunc(l: Summary, r: Activity) {
  return {
    calories: l.calories + r.caloriesBurned,
    distance: l.distance + (r.distance ? r.distance : 0),
    duration: l.duration + r.durationSeconds
  }
}

// Get activity summary for all time
const allTime = userActivities.reduce<Summary>(reductionFunc, {calories: 0, distance: 0, duration: 0})

// Get activity summary for this month
const thisMonth = userActivities.filter((act) => {
  const date = new Date(act.timestamp)
  const now = new Date(Date.now())
  return date.getFullYear() == now.getFullYear() &&
         date.getMonth() == now.getMonth()
}).reduce<Summary>(reductionFunc, {calories: 0, distance: 0, duration: 0})

// Get activity summary for today
const today = userActivities.filter((act) => {
  const date = new Date(act.timestamp)
  const now = new Date(Date.now())
  return date.getFullYear() == now.getFullYear() &&
         date.getMonth() == now.getMonth() &&
         date.getDay() == now.getDay()
}).reduce<Summary>(reductionFunc, {calories: 0, distance: 0, duration: 0})

</script>

<template>
  <div class="content">
    <h1 class="summary-head">Today</h1>
    <ActivityStats :summary="today" />
    <h1 class="summary-head">This Month</h1>
    <ActivityStats :summary="thisMonth" />
    <h1 class="summary-head">All Time</h1>
    <ActivityStats :summary="allTime" />
  </div>
</template>

<style scoped>
.summary-head {
  text-align: center;
}
</style>