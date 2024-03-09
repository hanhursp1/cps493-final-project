import users from '@/data/users.json'

// User access level
export enum UserPrivilege {
  FreeUser = 0,
  PremiumUser,
  Admin
}

// Name type containing first middle and last
export type Name = {
  first: string
  last: string
  middle?: string
}

// User type, as stored in the database
export interface User {
  id: number
  username: string
  displayname?: string // If undefined, use the user's real name
  name: Name
  token: string   // Hashed version of the password
  privilege: UserPrivilege  // User's privilege level
  activities: number[]  // Stores the IDs of the user's activities
}

// A simplified version of the user to store in the session
export interface UserSession {
  id: number    // The user's ID
  token: string // The hash of the user's password
}

export function getUsers(): User[] {
  return users.items as User[]
}