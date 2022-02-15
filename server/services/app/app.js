const express = require('express')
const morgan = require('morgan')
const os = require('os')
const { Teacher } = require('./models')

const app = express()
const PORT = Number(process.env.PORT) || 4002

app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'welcome to intro-docker/app service!!',
    os: os.platform(),
  })
})

app.get('/teachers', async (req, res) => {
  const teachers = await Teacher.findAll()
  res.status(200).json(teachers)
})

app.listen(PORT, () => {
  console.log(`this app running on port ${PORT}`)
})
