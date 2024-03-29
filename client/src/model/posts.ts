import posts from '@/data/posts.json'
import replies from '@/data/replies.json'
import store from '@/store'
import type { Ref } from 'vue'
import { createActivity, type ActivitySubmission } from './activities'

/* TYPES */
export interface Post {
  postID: number        // ID of the post
  posterID: number      // ID of the poster
  timestamp: number     // Unix timestamp of the post
  body: string          // Text contents of the post
  likedBy: number[]     // IDs of people who liked the post
  replies: number[]     // IDs of replies
  attachments: string[] // Photo attachments
  activityID?: number   // ID of associated workout, if there is one
}

export interface Reply {
  replyID: number       // ID of the reply
  parentID: number      // ID of the parent post
  posterID: number      // ID of the poster
  timestamp: number     // Unix timesamp of the reply
  body: string          // Text contained in the reply
}

export interface Submission {
  postBody: string
  attachments: string[]
  activity?: ActivitySubmission
}

/* FUNCTIONS */

// Get raw replies array from json.
// Meant only to be used by the store initializer.
export function getPostsRaw(): Post[] {
  return posts.items
}

// Get posts. Currently, gets all the posts from the store
export function getPosts(): Post[] {
  return store.state ? store.state.posts : []
}

// Get raw replies array from json.
// Much like `getPostsRaw`, this is only meant to
// be used by the store initializer.
export function getRepliesRaw(): Reply[] {
  return replies.items
}

// Get all replies. Currently gets from the store
export function getReplies(): Reply[] {
  return store.state ? store.state.replies : []
}

// Create a post and add it to the store
// Returns true if the task succeeded
export function createPost(post: Submission): boolean {
  if (store.state && store.state.user) {
    let newPost: Post = {
      postID: store.state.posts.length,
      posterID: store.state.user.id,
      timestamp: Date.now(),
      body: post.postBody,
      likedBy: [],
      replies: [],
      attachments: post.attachments,
      activityID: createActivity(post.activity)      
    }
    store.state.posts.push(newPost)
    return true;
  } else {
    return false;
  }
}

// Create a reply and add it to the store.
// Returns true if the task succeeded
export function createReply(reply: Reply, replyingTo: number): boolean {
  if (store.state && store.state.user) {
    reply.parentID = replyingTo
    reply.replyID = store.state.replies.length
    store.state.replies.push(reply)
    store.state.posts[replyingTo].replies.push(reply.replyID)
    return true;
  } else {
    return false;
  }
}

export function deletePost(id: number) {
  if (store.state) {
    store.state.posts[id] = undefined as unknown as Post
  }
}