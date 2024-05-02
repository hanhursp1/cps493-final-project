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
    })
  })
  .get("/:id", (req, res, next) => {
    
  })