<script setup lang="ts">
import { getUser } from '@/model/users';

const props = defineProps<{
  userID: number
}>()

const user = getUser(props.userID)
const userPFP = (user && user.pfp) ? user.pfp : './users/admin.png'

</script>

<template>
    <img :src="userPFP" class="pfp icon">
</template>

<style scoped>
.icon {

  width: 24px;
  height: 24px;
}
</style>