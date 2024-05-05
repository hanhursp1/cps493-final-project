const express = require('express')
const helpers = require('../helpers')
const posts = require('../../model/posts')

/**
 * @typedef {import('../../../client/src/model/posts').Post} Post
 * @typedef {import('../../../client/src/model/posts').Submission} Submission
 */ 
/**
 * @template T
 * @typedef {import('../../../client/src/model/transporttypes').DataEnvelope} DataEnvelope<T>
 */

const app = express.Router()

app
  .get("/", (req, res, next) => {
    posts.getAll().then(all => {
      res.send(helpers.makeResponse(all))
    }).catch(next)
  })
  .get("/:id", (req, res, next) => {
    const id = Number(req.params.id)
    posts.get(id).then(p => {
      res.send(helpers.makeResponse(p))
    }).catch(next)
  })
  .post("/", (req, res, next) => {
    /** @type {Submission} */
    const submission = req.body
    posts.create(submission).then(p => {
      res.send(helpers.makeResponse(p))
    }).catch(next)
  })
  .delete("/:id", (req, res, next) => {
    const id = Number(req.params.id)
    posts.remove(id).then(() => {
      res.send(helpers.makeEmptyResponse())
    }).catch(next)
  })
  .post("/:id/like", (req, res, next) => {
    const postID = Number(req.params.id)
    const userID = Number(req.body.userID)
    const liked = Boolean(req.body.liked)
    posts.like(postID, userID, liked).then(() => {
      res.send(helpers.makeEmptyResponse())
    }).catch(next)
  })

module.exports = app