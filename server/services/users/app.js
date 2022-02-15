const express = require('express')
const morgan = require('morgan')
const os = require('os')
const { mongodbRun } = require('./config/index')

const app = express()
const PORT = Number(process.env.PORT) || 4001

mongodbRun().catch(console.dir)

app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'welcome to intro-docker/users service',
    os: os.platform(),
  })
})

app.listen(PORT, () => {
  console.log(`this app running on port ${PORT}`)
})
