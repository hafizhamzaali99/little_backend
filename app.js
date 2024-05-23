const express = require('express')
const app = express()
const users = require('./routes/userRoute')
const property = require('./routes/propertyRoute')

app.use(express.json())

app.use('/api/v1/users/',users)
app.use('/api/v1/property/',property)

module.exports = app
