const fs = require('fs/promises')

/**
 * @template T
 * @param {string} path
 * @returns {Promise<{items: T[]}>} 
 */
async function getData(path) {
  return fs.access(path, fs.constants.F_OK)
    .then(() => fs.readFile(path, 'utf-8'))
    .then(content => JSON.parse(content))
    .catch(err => console.error(err))
}

/**
 * @template T
 * @param {string} path 
 * @param {{items: T[]}} data 
 * @returns {Promise<void>}
 */
async function saveData(path, data) {
  return fs.writeFile(path, JSON.stringify(data, null, 2))
}

module.exports = {
  getData,
  saveData
}