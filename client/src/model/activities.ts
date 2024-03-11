import activities from '@/data/activities.json'
import store from '@/store'

export interface Activity {
  id: number              // ID of the activity
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