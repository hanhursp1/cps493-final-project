const data = require('./data')
const users = require('./users')
const activities = require('./activities')
const { post } = require('../api')

/**
 * @typedef {import('../../client/src/model/posts').Post} Post
 * @typedef {import('../../client/src/model/posts').Submission} Submission
 */

const fileName = __dirname + "/../data/posts.json"

/**
 * @type {Promise<{items: Post[]}>}
 */
let dataP = data.getData(fileName)

async function refresh() {
  dataP = data.getData(fileName)
}

/**
 * 
 * @returns {Promise<Post[]>}
 */
async function getAll() {
  return (await dataP).items
}

/**
 * 
 * @param {number} id 
 * @returns {Promise<Post>}
 */
async function get(id) {
  const result = (await dataP).items[id]
  return result
}

/**
 * @param {Submission} submission 
 * @returns {Promise<Post>}
 */
async function create(submission) {
  const posts = await dataP
  const poster = await users.get(submission.posterID)
  let act
  if (submission.activity) {
    act = await activities.create(submission.activity)
    poster.activities.push(act.id)
  }
  /** @type {Post} */
  let newPost = {
    postID: posts.items.length,
    removed: false,
    posterID: submission.posterID,
    timestamp: Date.now(),
    body: submission.postBody,
    likedBy: [],
    replies: [],
    attachments: submission.attachments,
    activityID: act ? act.id : undefined
  }
  poster.posts.push(newPost.postID)
  posts.items.push(newPost)
  try {
    await data.saveData(fileName, posts)
    refresh()
    users.update(poster)
  } catch(err) {
    console.log(err)
    throw new Error("Could not create post")
  }
  return newPost
}

/**
 * 
 * @param {number} postID 
 * @param {number} userID 
 * @param {boolean} liked 
 */
async function like(postID, userID, liked) {
  const posts = await dataP
  if (!users.userExists(userID)) throw new Error("User does not exist")
  if (liked)
    posts.items[postID].likedBy.push(userID)
  else
    posts.items[postID].likedBy = posts.items[postID].likedBy.filter(id => id !== userID)
  try {
    await data.saveData(fileName, posts)
    refresh()
  } catch(err) {
    console.log(err)
    throw new Error("Could not like post")
  }
}

/**
 * 
 * @param {number} id
 * @returns {Promise<void>}
 */
async function remove(id) {
  const posts = await dataP
  if (id < 0 || id >= posts.items.length) {
    throw new Error("Post ID out of range")
  }
  // @ts-ignore
  posts.items[id] = {
    postID: id,
    removed: true
  }
  try {
    await data.saveData(fileName, posts)
    refresh()
  } catch(err) {
    console.log(err)
    throw new Error("Could not delete post")
  }
}

module.exports = {
  getAll,
  get,
  create,
  remove,
  like
}