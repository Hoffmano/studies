const express = require('express')
const router = require('./user/UserRouter')

const app = express()
app.use(express.json())
app.use(router)

module.exports = app
