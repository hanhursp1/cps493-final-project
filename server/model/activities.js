const data = require('./data')

/**
 * @typedef {import('../../client/src/model/activities').Activity} Activity
 * @typedef {import('../../client/src/model/activities').ActivitySubmission} ActivitySubmission
 */

const fileName = __dirname + "/../data/activities.json"

/**
 * @type {Promise<{items: Activity[]}>}
 */
let dataP = data.getData(fileName)

async function refresh() {
  dataP = data.getData(fileName)
}

/**
 * 
 * @returns {Promise<Activity[]>}
 */
async function getAll() {
  return (await dataP).items
}

/**
 * 
 * @param {number} id
 * @returns {Promise<Activity>} 
 */
async function get(id) {
  const result = (await dataP).items[id]
  return result
}

/**
 * 
 * @param {ActivitySubmission} submission
 * @returns {Promise<Activity>}
 */
async function create(submission) {
  const acts = await dataP
  /** @type {Activity} */
  let newAct = {
    id: acts.items.length,
    name: submission.name,
    timestamp: Date.now(),
    durationSeconds: submission.durationMinutes * 60,
    caloriesBurned: submission.calories,
    distance: submission.distance != 0 ? submission.distance : undefined,
    photo: submission.photo
  }
  acts.items.push(newAct)
  try {
    await data.saveData(fileName, acts)
    refresh()
  } catch(err) {
    console.error(err)
    throw new Error("Could not create activity")
  }
  return newAct
}

/**
 * 
 * @param {number} id 
 * @returns {Promise<void>}
 */
async function remove(id) {
  const acts = await dataP
  if (id < 0 || id >= acts.items.length) {
    throw new Error("Activity ID out of range")
  }
  // @ts-ignore
  acts.items[id] = {
    id: id,
    removed: true
  }
  try {
    await data.saveData(fileName, acts)
    refresh()
  } catch(err) {
    console.log(err)
    throw new Error("Failed to delete activity")
  }
}

module.exports = {
  refresh,
  getAll,
  get,
  create,
  remove
}