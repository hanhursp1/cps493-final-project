
export interface PostBody {
  posterID: number
  body: string
  likes: number
  reposts: number
  replies: number[]
  attachments: string[]
}

export interface Post {
  title: string
  body: PostBody
  workoutID?: number
}

export interface Reply {
  parentID: number
  body: PostBody
}

export interface Repost {
  postID: number
  reposterID: number
}