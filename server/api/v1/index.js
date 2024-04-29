const express = require('express')
const users = require('./users')


const app = express.Router()

app
  .use("/users", users)
  .get('/err', (req, res, next) => {
    (async () => {
      throw new Error("Test errore!")
    })().catch(next)
  })

module.exports = app