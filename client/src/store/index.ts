import { reactive } from "vue"
import type { UserSession, User } from "@/model/users"
import type { Post, Reply } from "@/model/posts"

// Global state of the application
export type StoreData = {
  user?: UserSession    // User session data. Will be undefined if user is not logged in
  users: User[]         // Array of cached users
  usernameMap: Map<string, number>  // Map of usernames to IDs. Used when logging in
  posts: Post[]         // Array of cached posts
  replies: Reply[]      // Array of cached replies
}

// Store the store in a reactive const
const store = reactive<{
  state?: StoreData
}>({

})

export default store