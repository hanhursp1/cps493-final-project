const express = require('express')
const users = require('./users')
const activities = require('./activities')


const app = express.Router()

app
  .use("/users", users)
  .use("/activities", activities)
  .get('/err', (req, res, next) => {
    (async () => {
      throw new Error("Test error!")
    })().catch(next)
  })

module.exports = app