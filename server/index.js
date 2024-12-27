const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 8081
require('dotenv').config()

const MONGO_URI = process.env.MONGO_URL

const connectToDb = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Connected to the database')
  } catch (error) {
    console.error('Error connecting to the database: ', error)
  }
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

