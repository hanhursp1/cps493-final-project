require('dotenv').config()
const express = require('express')
const path = require('path')
const api = require('./api')

/**
 * @template T
 * @typedef {import('../client/src/model/transporttypes').DataEnvelope} DataEnvelope<T>
 */


const app = express()
const PORT = process.env.PORT ?? 3000

app
  .use(express.static('client/dist'))
  .use(express.json())
  .use((req, resp, next) => {
    resp.setHeader("Access-Control-Allow-Origin", "*")
    resp.setHeader("Access-Control-Allow-Methods", "*")
    resp.setHeader("Access-Control-Allow-Headers", "*")
    next()
  })
  .use("/api", api)
  .use((req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"))
  })
  .use((err, req, res, next) => {
    console.error(err)
    /** @type {DataEnvelope<void>} */
    const results = {
      data: undefined,
      isSuccess: false,
      message: err.message || "Internal server error"
    }
    res.status(500).send(results)
  })

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})