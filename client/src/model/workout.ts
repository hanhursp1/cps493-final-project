
export enum ExcerciseKind {
  Flexibility = 0,
  Aerobic,
  Anaerobic
}

export interface Workout {
  name: string
  kind: ExcerciseKind
  timestamp: number   // Date and time as Unix timestamp
  durationSeconds: number
  caloriesBurned: number
}