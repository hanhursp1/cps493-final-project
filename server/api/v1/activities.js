const express = require('express')
const helpers = require('../helpers')
const activities = require('../../model/activities')

/**
 * @typedef {import('../../../client/src/model/activities').Activity} Activity
 * @typedef {import('../../../client/src/model/activities').ActivitySubmission} ActivitySubmission
 */ 
/**
 * @template T
 * @typedef {import('../../../client/src/model/transporttypes').DataEnvelope} DataEnvelope<T>
 */

const app = express.Router()

app
  .get("/", (req, res, next) => {
    activities.getAll().then(all => {
      res.send(helpers.makeResponse(all))
    }).catch(next)
  })
  .get("/:id", (req, res, next) => {
    const id = Number(req.params.id)
    activities.get(id).then(act => {
      res.send(helpers.makeResponse(act))
    }).catch(next)
  })
  .post("/", (req, res, next) => {
    /** @type {ActivitySubmission} */
    const act = req.body
    activities.create(act).then(result => {
      res.send(helpers.makeResponse(result))
    }).catch(next)
  })
  .delete("/:id", (req, res, next) => {
    const id = Number(req.params.id)
    activities.remove(id).then(result => {
      /** @type {DataEnvelope<void>} */
      const response = {
        data: undefined,
        isSuccess: true
      }
      res.send(response)
    }).catch(next)
  })