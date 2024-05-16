<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { getUsers, searchUsers, type User } from '@/model/users';
  import { useRedirect } from '@/model/fetch';

  const redirect = useRedirect()

  const usersList = ref([] as User[])

  const selected = ref(null as unknown as User)

  const isFetching = ref(false)

  async function fetchData(name: string) {
    isFetching.value = true
    usersList.value = await searchUsers({query: name.toLowerCase(), maxUsers: 10})
    isFetching.value = false
  } 

  function select(option: User) {
    redirect.redirect("/users/" + option.id)
  }


</script>

<template>
  <div>
    <section>
      <o-field>
        <o-autocomplete
          placeholder="Search"
          icon="search"
          clearable
          :loading="isFetching"
          :data="usersList"
          :debounce="500"
          field="name.first"
          @input="fetchData"
          @select="select"
          >
          <template #empty>No results found</template>
          <template #default="props">
            {{ props.option.name.first + " " + props.option.name.last }}
          </template>
        </o-autocomplete>
      </o-field>
    </section>
  </div>
</template>

<style scoped>

</style>