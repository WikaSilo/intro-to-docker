const express = require('express')
const morgan = require('morgan')
const os = require('os')

const app = express()
const port = Number(process.env.PORT) || 3000

app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'welcome to intro docker!!',
    port: port,
    os: os.platform(),
  })
})

app.listen(port, () => console.log(`this app running on port: ${port}`))
