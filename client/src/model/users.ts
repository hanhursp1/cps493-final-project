import users from '@/data/users.json'
import usernamemap from '@/data/usernamemap.json'
import store from '@/store'

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

// Gets the users array from the json, meant for store initialization
export function getUsersRaw(): User[] {
  return users.items as User[]
}

// Gets the cached users from the store
export function getUsers(): User[] {
  if (store.state) {
    return store.state.users
  } else {
    return []
  }
}

// // Gets the map of usernames to IDs. Meant as a debug for logging in.
// export function getUsernameMap(): Map<string, number> {
//   return new Map(Object.entries(usernamemap))
// }

