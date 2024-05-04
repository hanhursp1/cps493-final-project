// import posts from '@/data/posts.json'
// import replies from '@/data/replies.json'
import store from '@/store'
import { apiDelete, apiGet, apiPost } from './fetch'
import type { Ref } from 'vue'
import { createActivity, type ActivitySubmission } from './activities'

/* TYPES */
export interface Post {
  postID: number        // ID of the post
  removed?: boolean
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
  posterID: number
  postBody: string
  attachments: string[]
  activity?: ActivitySubmission
}

/* FUNCTIONS */

// Get raw replies array from json.
// Meant only to be used by the store initializer.
export async function getPostsRaw(): Promise<Post[]> {
  const posts = await apiGet<Post[]>("posts")
  return posts.isSuccess ? posts.data : []
}

// Get posts. Currently, gets all the posts from the store
export function getPosts(): Post[] {
  return store.state ? store.state.posts : []
}

export function getPost(id: number): Post|undefined {
  const result = store.state ? store.state.posts[id] : undefined
  if (result && !result.removed) return result
  return undefined
}

// Get raw replies array from json.
// Much like `getPostsRaw`, this is only meant to
// be used by the store initializer.
// Replies have not been implemented yet.
export async function getRepliesRaw(): Promise<Reply[]> {
  // const replies = await apiGet<Reply[]>("replies")
  return [] as Reply[]
}

// Get all replies. Currently gets from the store
export function getReplies(): Reply[] {
  return store.state ? store.state.replies : []
}

// Create a post and add it to the store
// Returns true if the task succeeded
export async function createPost(post: Submission): Promise<boolean> {
  const newPost = await apiPost<Submission, Post>("posts", post)
  if (newPost.isSuccess && store.state) {
    // Update posts after submitting a new post
    store.state.posts = await getPostsRaw()
  }
  return newPost.isSuccess
}

// Create a reply and add it to the store.
// Returns true if the task succeeded
// export function createReply(reply: Reply, replyingTo: number): boolean {
//   if (store.state && store.state.user) {
//     reply.parentID = replyingTo
//     reply.replyID = store.state.replies.length
//     store.state.replies.push(reply)
//     store.state.posts[replyingTo].replies.push(reply.replyID)
//     return true;
//   } else {
//     return false;
//   }
// }

export async function deletePost(id: number) {
  // if (store.state) {
  //   store.state.posts[id] = undefined as unknown as Post
  // }
  const result = await apiDelete<void, void>("posts/" + id)
  if (result.isSuccess && store.state) {
    store.state.posts[id] = {
      postID: id,
      removed: true
    } as Post
  }
}

export function postIsActive(post: Post | undefined) {
  return post && !post.removed
}