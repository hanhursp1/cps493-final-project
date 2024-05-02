const express = require('express')
const helpers = require('../helpers')
const users = require('../../model/users')

/**
 * @typedef {import('../../../client/src/model/users').User} User
 */ 
/**
 * @typedef {import('../../../client/src/model/registration').Signup} Signup
 */ 
/**
 * @template T
 * @typedef {import('../../../client/src/model/transporttypes').DataEnvelope} DataEnvelope<T>
 */

const app = express.Router()

app
  .get("/", (req, res, next) => {
    users.getAll().then(all => {
      res.send(helpers.makeResponse(all))
    }).catch(next)
  })
  .get("/search", (req, res, next) => {
    if(!req.query.q) throw new Error("Search query requires a query")
    const search = String(req.query.q)
    users.search(search).then(result => {
      res.send(helpers.makeResponse(result))
    }).catch(next)
  })
  .get("/:id", (req, res, next) => {
    const id = Number(req.params.id)
    users.get(id).then(user => {
      res.send(helpers.makeResponse(user))
    }).catch(next)
  })
  .post("/", (req, res, next) => {
    const user = req.body
    users.add(user).then(usr => {
      res.send(helpers.makeResponse(usr))
    }).catch(next)
  })
  .patch("/:id", (req, res, next) => {
    let user = req.body
    user.id = Number(req.params.id)
    users.update(user.id).then(result => {
      res.send(helpers.makeResponse(result))
    }).catch(next)
  })
  .delete("/:id", (req, res, next) => {
    const id = Number(req.params.id)
    const admin = req.body
    users.remove(id).then(result => {
      res.send(helpers.makeResponse(result))
    }).catch(next)
  })
  .post("/login", (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      throw new Error("Username and password fields required")
    }
    users.login(req.body.username, req.body.password).then(user => {
      res.send(helpers.makeResponse(user))
    }).catch(next)
  })
  // .post("/register", (req, res, next) => {

  // })

module.exports = app