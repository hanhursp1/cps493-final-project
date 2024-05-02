import activities from '@/data/activities.json'
import store from '@/store'

export enum Visibility {
  Public = 0,
  Private = 1,
  Deleted = 2
}

export interface Activity {
  id: number              // ID of the activity
  removed?: boolean       // Whether or not post has been deleted
  name: string            // Name of the exercise
  timestamp: number       // Date and time as Unix timestamp
  durationSeconds: number // Amount of time exercise was done for
  caloriesBurned: number  // Number of calories burned
  distance?: number       // Distance traveled (in meters, only if exercise involves movement)
  photo?: string          // Photo attachment (optional)
}

export interface Summary {
  calories: number
  distance?: number
  duration: number
}

export interface ActivitySubmission {
  name: string
  photo?: string
  calories: number
  distance: number
  durationMinutes: number
}

export function createSummary(act: Activity): Summary {
  return {
    calories: act.caloriesBurned,
    distance: act.distance,
    duration: act.durationSeconds
  }
}

// Get raw activities array from json.
// Only meant to be used by the store initializer.
export function getActivitiesRaw(): Activity[] {
  return activities.items
}

export function getActivities(): Activity[] {
  return store.state ? store.state.activities : []
}

export function getActivityByID(id: number): Activity {
  return store.state ? store.state.activities[id] : undefined as unknown as Activity
}

export function createActivity(act: ActivitySubmission | undefined): number | undefined {
  if (store.state && act !== undefined && store.state.user) {
    let newAct: Activity = {
      id: store.state.activities.length,
      name: act.name,
      timestamp: Date.now(),
      durationSeconds: act.durationMinutes * 60,
      caloriesBurned: act.calories,
      distance: act.distance != 0 ? act.distance : undefined,
      photo: act.photo
    }
    store.state.activities.push(newAct)
    store.state.user.userData.activities.push(newAct.id)
    return newAct.id
  } else {
    return undefined
  }
}