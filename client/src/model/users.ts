// import users from '@/data/users.json'
// import usernamemap from '@/data/usernamemap.json'
import store from '@/store'
import { apiGet } from './fetch'

// User access level
export enum UserPrivilege {
  FreeUser = 0,
  PremiumUser,
  Admin
}

export enum UserStatus {
  Active = 0,
  Deleted,
  Deactivated
}

// Name type containing first middle and last
export type Name = {
  first: string
  last: string
  middle?: string
}

// User type, as stored in the database
export interface User {
  id: number            // User ID
  status: UserStatus    // Whether or not the user is active or inactive
  username: string      // User's username, used to login
  displayname?: string  // If undefined, use the user's real name
  name: Name            // User's full name
  token: string         // Hashed version of the password
  pfp?: string           // URL to the user's profile picture
  privilege: UserPrivilege  // User's privilege level
  posts: number[]       // IDs of the user's posts
  activities: number[]  // Stores the IDs of the user's activities
  friends: number[]     // IDs of the user's friends
}

// A simplified version of the user to store in the session
export interface UserSession {
  id: number    // The user's ID
  token: string // The hash of the user's password
  userData: User// The user's data (Will likely be removed in the future for security)
}

export function getConcatName(user: User): string {
  return user?.displayname ? user.displayname : user?.name.first + " " + user?.name.last
}

// Gets the users array from the json, meant for store initialization
export async function getUsersRaw(): Promise<User[]> {
  const users = await apiGet<User[]>("posts")
  return users.isSuccess ? users.data : []
}

// Gets the cached users from the store
export function getUsers(): User[] {
  return store.state ? store.state.users : []
}

// Returns a user based on their ID
export function getUser(userID: number): User | undefined {
  return store.state ? store.state.users[userID] : undefined
}

// Returns a users's ID based on their username
export async function getUserID(username: string): Promise<number | undefined> {
  const users = await apiGet<User[]>("search?q=" + username)
  if (!users.isSuccess) {
    return undefined
  }
  const found = users.data.find(user => user.username === username)
  return found ? found.id : undefined
}

export function currentUser(): User | undefined {
  return store.state?.user ? getUser(store.state.user.id) : undefined
}

export function currentUserID(): number {
  return store.state?.user?.id ? store.state.user.id : -1
}

export function isLoggedIn(): boolean {
  return store.state?.user !== undefined;
}

export function getPFP(user: User | undefined): string {
  return user?.pfp ? user.pfp : './users/admin.png'
}

export function removeUser(id: number) {
  if (store.state) {
    store.state.users[id] = undefined as unknown as User
  }
}