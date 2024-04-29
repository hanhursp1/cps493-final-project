const data = require('./data')
const sha = require('@aws-crypto/sha256-js')

/**
 * @typedef {import('../../client/src/model/users').User} User
 */

const fileName = __dirname + "/../data/users.json"

/**
 * @type {Promise<{items: User[]}>}
 */
const dataP = data.getData(fileName)

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
 * Gets a sanitized list of all users
 * @returns {Promise<User[]>}
 */
async function getAll() {
  return (await dataP).items.filter(user => !user.removed).map(x => sanitizeUser(x))
}

/**
 * Gets a sanitized user based on `id`
 * @param {number} id 
 * @returns {Promise<User>}
 */
async function get(id) {
  // return sanitizeUser((await dataP).items.find(item => item.id === id))  // This is O(n)
  const result = sanitizeUser((await dataP).items[id])  // This is O(1) as long as we keep continuity in users.json
  if (result.removed) {
    throw new Error("Cannot get deleted user")
  }
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
    !item.removed && (
    filter.test(item.name.first) ||
    filter.test(item.name.last) ||
    filter.test(item.username))
  ).map(u => sanitizeUser(u))
}

/**
 * 
 * @param {User} user 
 * @param {number} id 
 * @returns {Promise<User>}
 */
async function update(user, id = null) {
  const users = await dataP
  const index = id ?? user.id
  if (!index || index < 0 || index >= users.items.length) {
    throw new Error("User id does not exist")
  }
  if (users.items[index].removed) {
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
    ...user,
    id: index
  }
  users.items[index] = userResult
  try {
    await data.saveData(fileName, users)
  } catch(err) {
    // console.error(err)
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
  } catch (err) {
    throw new Error("Could not add user to ")
  }
  return user
}

/**
 * 
 * @param {number} id
 * @returns {Promise<boolean>}
 */
async function remove(id) {
  const users = await dataP
  if (id < 0 || id >= users.items.length) return false
  // @ts-ignore
  users.items[id] = {
    id: id,
    removed: true
  }
  try {
    await data.saveData(fileName, users)
  } catch(err) {
    console.error(err)
    return false
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
 * 
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<User>}
 */
async function login(username, password) {
  const users = await dataP
  const passHash = await hashPassword(password)
  const user = users.items.find(item => !item.removed && (item.username === username && item.token === passHash))
  if (!user) throw new Error("Invalid email or password")
  return user
}

async function register(username, password) {

}

module.exports = {
  get,
  getAll,
  search,
  add,
  remove,
  update,
  login
}