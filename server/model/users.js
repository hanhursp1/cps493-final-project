const data = require('./data')
const sha = require('@aws-crypto/sha256-js')

/**
 * @typedef {import('../../client/src/model/users').User} User
 * @typedef {import('../../client/src/model/users').UserSession} UserSession
 * @typedef {import('../../client/src/model/users').Registration} Registration
 */

const fileName = __dirname + "/../data/users.json"

/**
 * @type {Promise<{items: User[]}>}
 */
let dataP = data.getData(fileName)

async function refresh() {
  dataP = data.getData(fileName)
}

/**
 * @type {User}
 */
const defaultUser = {
  id: -1,   // If a user has id -1, something has gone HORRIBLY wrong
  status: 0,
  username: "newuser",
  name: {
    first: "New",
    last: "User"
  },
  token: undefined,
  privilege: 0,
  posts: [],
  activities: [],
  friends: []
}

/**
 * @param {User} user 
 * @returns {User}
 */
function sanitizeUser(user) {
  return{
    token: undefined,
    ...user
  }
}

/**
 * @returns {Promise<number>}
 */
async function getNextID() {
  return (await dataP).items.length
}

/**
 * Gets a sanitized list of all users
 * @returns {Promise<User[]>}
 */
async function getAll() {
  return (await dataP).items.map(x => sanitizeUser(x))
}

/**
 * Gets a sanitized user based on `id`
 * @param {number} id 
 * @returns {Promise<User>}
 */
async function get(id) {
  // return sanitizeUser((await dataP).items.find(item => item.id === id))  // This is O(n)
  const result = sanitizeUser((await dataP).items[id])  // This is O(1) as long as we keep continuity in users.json
  // if (result.status != 0) {
  //   throw new Error("Cannot get deleted user")
  // }
  return result
}

/**
 * Gets an unsanitized user based on `id`. Requires admin rights.
 * This allows an admin to modify a user's profile.
 * @param {User} admin 
 * @param {number} id 
 * @returns {Promise<User>}
 */
async function getAsAdmin(admin, id) {
  const result = (await dataP).items[id]
  return result
}

/**
 * 
 * @param {string} q 
 * @returns {Promise<User[]>}
 */
async function search(q) {
  const filter = new RegExp(q, 'i')
  return (await dataP).items.filter(item =>
    item.status == 0 && (
    filter.test(item.name.first) ||
    filter.test(item.name.last) ||
    filter.test(item.username))
  ).map(u => sanitizeUser(u))
}

/**
 * Sanitizes a user to remove fields that should not be edited
 * @param {User} user 
 * @returns {User}
 */
function sanitizeUserForUpdate(user) {
  return {
    ...user,
    token: undefined,
    privilege: undefined,
    posts: undefined,
    activities: undefined,
    friends: undefined
  }
}

/**
 * 
 * @param {User} user 
 * @param {number} id 
 * @returns 
 */
async function update(user, id = null) {
  const users = await dataP
  const index = id ?? user.id
  if (!index || index < 0 || index >= users.items.length) {
    throw new Error("User id does not exist")
  }

  let userResult = {
    ...users.items[index],
    ...user,
    id: index
  }
  users.items[index] = userResult
  try {
    await data.saveData(fileName, users)
    refresh()
  } catch(err) {
    console.error(err)
    throw new Error("Could not save user data.")
  }
  return userResult

}

/**
 * 
 * @param {User} user 
 * @param {number} id 
 * @returns {Promise<User>}
 */
async function updateSafe(user, id = null) {
  const users = await dataP
  const index = id ?? user.id
  if (!index || index < 0 || index >= users.items.length) {
    throw new Error("User id does not exist")
  }
  if (users.items[index].status == 2) {
    throw new Error("User no longer exists")
  }
  if (!user.token || user.token !== users.items[index].token) {
    throw new Error("Invalid user token")
  }
  /**
   * @type {User}
   */
  let userResult = {
    ...users.items[index],
    ...sanitizeUserForUpdate(user),
    id: index
  }
  users.items[index] = userResult
  try {
    await data.saveData(fileName, users)
    refresh()
  } catch(err) {
    console.error(err)
    throw new Error("Could not save user data.")
  }
  return userResult
}



/**
 * @param {User} user 
 * @returns {Promise<User>}
 */

async function add(user) {
  const users = await dataP
  user.id = users.items.length
  users.items.push(user)
  try {
    await data.saveData(fileName, users)
    refresh()
  } catch (err) {
    console.error(err)
    throw new Error("Could not add user to database.")
  }
  return user
}

/**
 * 
 * @param {*} id 
 */
async function remove(id) {
  const users = await dataP
  if (id < 0 || id >= users.items.length) throw new Error("User does not exist")
  // @ts-ignore
  users.items[id] = {
    id: id,
    status: 2
  }
  try {
    await data.saveData(fileName, users)
    refresh()
  } catch(err) {
    console.error(err)
    throw new Error("Could not remove user from database.")
  }
  return true
}

/**
 * This remove function requires an admin token to use
 * @param {User} admin
 * @param {number} id
 * @returns {Promise<boolean>}
 */
async function removeSafe(admin, id) {
  const users = await dataP
  if (id < 0 || id >= users.items.length) throw new Error("User does not exist")
  if (!verifyAdmin(admin)) throw new Error("User " + admin.username + " is not an admin")
  // @ts-ignore
  users.items[id] = {
    id: id,
    status: 2
  }
  try {
    await data.saveData(fileName, users)
    refresh()
  } catch(err) {
    console.error(err)
    throw new Error("Could not remove user from database.")
  }
  return true
}

/**
 * 
 * @param {Uint8Array} byteArray 
 * @returns {string}
 */
// https://stackoverflow.com/a/34310051
function toHexString(byteArray) {
  return Array.from(byteArray, byte => {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('')
}

/**
 * 
 * @param {string} password
 * @returns {Promise<string>}
 */
async function hashPassword(password) {
  const hash = new sha.Sha256();
  hash.update(password)
  return toHexString(await hash.digest())
}

/**
 * Verify that a user is an admin
 * @param {User} admin
 * @returns {Promise<boolean>} 
 */
async function verifyAdmin(admin) {
  const id = admin.id
  const users = await dataP
  if (users.items[id].privilege < 3) 
    return false
  if (users.items[id].token !== admin.token)
    return false
  return true
}

/**
 * 
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<UserSession>}
 */
async function login(username, password) {
  const users = await dataP
  const passHash = await hashPassword(password)
  // console.log(username)
  // console.log(password)
  // console.log(passHash)
  const user = users.items.find(item => item.status == 0 && (item.username === username && item.token === passHash))
  // console.log(user)
  if (!user) throw new Error("Invalid email or password")
  return {
    id: user.id,
    token: user.token,
    userData: user
  }
}

/**
 * 
 * @param {Registration} info
 */

async function register(info) {
  let users = await dataP
  let hasSameUsername = users.items.findIndex(it => it.username == info.username)
  if (hasSameUsername != -1) {
    // throw new Error("User already exists")
    return true
  }
  /** @type {User} */
  let user = {
    id: await getNextID(),
    status: 0,
    username: info.username,
    name: info.name,
    token: await hashPassword(info.password),
    privilege: 0,
    posts: [],
    activities: [],
    friends: []
  }
  users.items.push(user)
  try {
    await data.saveData(fileName, users)
    refresh()
  } catch(err) {
    console.error(err)
    throw new Error("Something went wrong with the registration")
  }
  return false
}

module.exports = {
  get,
  getAll,
  search,
  add,
  remove,
  removeSafe,
  update,
  updateSafe,
  login,
  register
}