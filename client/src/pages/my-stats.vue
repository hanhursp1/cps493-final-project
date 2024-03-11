<script setup lang="ts">
import router from '@/router';
import { currentUser, getUser, isLoggedIn, type User } from '@/model/users';
import { getActivityByID, type Activity, type Summary } from '@/model/activities';
import ActivityStats from '@/components/ActivityStats.vue'

if (!isLoggedIn()) {
  router.push('/')
}

const user = currentUser() as User
const userActivities = user.activities
  .map((id) => getActivityByID(id))
  .filter((act) => act !== undefined) as Activity[]

function reductionFunc(l: Summary, r: Activity) {
  return {
    calories: l.calories + r.caloriesBurned,
    distance: (l.distance ? l.distance : 0) + (r.distance ? r.distance : 0),
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
    <ActivityStats :summary="today" :colored-b-g="true" />
    <h1 class="summary-head">This Month</h1>
    <ActivityStats :summary="thisMonth" :colored-b-g="true" />
    <h1 class="summary-head">All Time</h1>
    <ActivityStats :summary="allTime" :colored-b-g="true" />
  </div>
</template>

<style scoped>
.summary-head {
  text-align: center;
}
</style>