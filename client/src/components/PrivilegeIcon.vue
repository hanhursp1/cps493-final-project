<script setup lang="ts">
import { UserPrivilege, type User } from '@/model/users';

const props = defineProps<{
  poster: User
}>()
</script>

<template>
  <span class="icon-text" v-if="poster.privilege > 0">
    <span class="icon">
      <i class="fas" :class='{
        "fa-shield-alt green": poster?.privilege === UserPrivilege.Admin,
        "fa-crown gold": poster?.privilege === UserPrivilege.PremiumUser
      }'></i>
    </span>
  </span>
</template>

<style scoped>
.gold {
  color: gold;
}

.green {
  color: green;
}
</style>