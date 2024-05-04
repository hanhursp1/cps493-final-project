const data = require('./data')
const activities = require('./activities')

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
  let act
  if (submission.activity) {
    act = await activities.create(submission.activity)
  }
  /** @type {Post} */
  let newPost = {
    postID: posts.items.length,
    posterID: submission.posterID,
    timestamp: Date.now(),
    body: submission.postBody,
    likedBy: [],
    replies: [],
    attachments: submission.attachments,
    activityID: act ? act.id : undefined
  }
  posts.items.push(newPost)
  try {
    await data.saveData(fileName, posts)
    refresh()
  } catch(err) {
    console.log(err)
    throw new Error("Could not create post")
  }
  return newPost
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
    postID: id
  }
}

module.exports = {
  getAll,
  get,
  create,
  remove
}