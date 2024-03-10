
export interface Activity {
  id: number              // ID of the activity
  name: string            // Name of the exercise
  timestamp: number       // Date and time as Unix timestamp
  durationSeconds: number // Amount of time exercise was done for
  distance?: number       // Distance traveled (if exercise involves movement)
  caloriesBurned: number  // Amount of calories burned
}