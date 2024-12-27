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

interface Request {
  // Define properties of the request object if needed
}

interface Response {
  send: (body?: any) => Response
}

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

