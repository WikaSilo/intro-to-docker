const express = require('express')
const morgan = require('morgan')
const os = require('os')
const { connectMongoDb, getDatabase } = require('./config/mongo')

const app = express()
const port = Number(process.env.PORT) || 3000
// const dbUri = 'mongodb://localhost:27017'
// docker-mongo
const dbUri = 'mongodb://localhost:17017'

app.use(morgan('dev'))

connectMongoDb(dbUri).catch(console.dir)

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'welcome to intro docker!!',
    port: port,
    os: os.platform(),
  })
})

app.listen(port, () => console.log(`this app running on port: ${port}`))
