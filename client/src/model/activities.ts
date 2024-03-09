import type { Post, Repost, Reply } from "./posts"
import activities from "@/data/activities.json"

export interface Activity {
  id: number
  timestamp: number   // Date and time as Unix timestamp
}

export interface PostActivity extends Activity {
  post: Post
}

export interface RepostActivity extends Activity {
  repost: Repost
}

export interface ReplyActivity extends Activity {
  reply: Reply
}

export function getActivities(): Activity[] {
  return activities.items as Activity[]
}