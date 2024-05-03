const express = require('express')
const users = require('./users')
const activities = require('./activities')
const posts = require('./posts')


const app = express.Router()

app
  .use("/users", users)
  .use("/activities", activities)
  .use("/posts", posts)
  .get('/err', (req, res, next) => {
    (async () => {
      throw new Error("Test error!")
    })().catch(next)
  })

module.exports = app