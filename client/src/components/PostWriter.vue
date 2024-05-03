<script setup lang="ts">
import { createActivity, type Activity, type ActivitySubmission } from '@/model/activities';
import { createPost, type Post, type Submission } from '@/model/posts';
import { currentUser, currentUserID } from '@/model/users';
import { ref, type Ref } from 'vue';

const props = defineProps<{
  isWorkout: boolean
  isActive: boolean
}>()

const emit = defineEmits<{
  exit: [boolean]   // Emit that is called on exit. Passes true if exit was a post submission.
}>()

const postBody = ref("")
const errors = ref([
  false, false, false, false
] as boolean[])

const submission: Ref<Submission> = ref({
  posterID: currentUserID(),
  postBody: "",
  attachments: []
})

const activity: Ref<ActivitySubmission> = ref({
  name: "",
  calories: 0,
  distance: 0,
  durationMinutes: 0
})

async function submitPost() {
  // Check for errors before submitting the post
  errors.value[0] = submission.value.postBody == ""
  if(props.isWorkout) {
    errors.value[1] = activity.value.name == ""
    errors.value[2] = activity.value.calories == 0
    errors.value[3] = activity.value.durationMinutes == 0
    submission.value.activity = activity.value
  } else {
    submission.value.activity = undefined
  }
  if(errors.value.reduce((l, r) => l || r, false)) {
    return
  }
  const postSuccess = await createPost(submission.value)
  if (postSuccess)
    emit('exit', true)
}


const createNew = props.isWorkout ? "Create new workout" : "Create new post"
</script>

<template>
  <div v-if="isActive" class="post-writer card">
    <div class="field">
      <label class="label">{{ createNew }}</label>
      <div class="control">
        <textarea type="textarea" class="input" rows="5" :class="{'is-danger': errors[0]}" v-model="submission.postBody"></textarea>
      </div>
    </div>

    <div v-if="isWorkout">
      <div class="field">
        <label class="label">Workout Name</label>
        <div class="control">
          <input type="text" class="input" placeholder="Cycling" :class="{'is-danger': errors[1]}" v-model="activity.name">
        </div>
      </div>
      <div class="field">
        <label class="label">Calories Burned</label>
        <div class="control">
          <input type="number" class="input" placeholder="100" :class="{'is-danger': errors[2]}" v-model="activity.calories">
        </div>
      </div>
      <div class="field">
        <label class="label">Distance Traveled (in meters, optional)</label>
        <div class="control">
          <input type="number" class="input" placeholder="1000" v-model="activity.distance">
        </div>
      </div>
      <div class="field">
        <label class="label">Duration of Activity (in minutes)</label>
        <div class="control">
          <input type="number" class="input" placeholder="60" :class="{'is-danger': errors[3]}" v-model="activity.durationMinutes">
        </div>
      </div>
      <br>
    </div>

    <div class="field is-grouped">
    <div class="control">
      <button class="button is-link" @click="submitPost()">Submit</button>
    </div>
    <div class="control">
      <button class="button is-link is-light" @click="emit('exit', false)">Cancel</button>
    </div>
  </div>
  </div>
</template>

<style scoped>
.post-writer {
  /* display: ; */
  position: absolute;
  padding:20px;
  width: 50%;
  z-index: 128;
}

textarea {
  height: auto;
}
</style>