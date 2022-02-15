const { MongoClient } = require('mongodb')

// const uri = 'mongodb://localhost:27017'
const uri = process.env.MONGODB_ATLAS_URI || 'mongodb://localhost:27017'

const client = new MongoClient(uri)

let database = null

async function mongodbRun() {
  try {
    await client.connect()
    database = client.db('intro-docker')
    console.log('Connected mongodb successfully to server')
  } catch (err) {
    console.log(err)
    throw 'Connected mongodb failed to server'
  }
}

function getDatabase() {
  return database
}

module.exports = {
  mongodbRun,
  getDatabase,
}
