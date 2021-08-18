const { MongoClient } = require('mongodb')

let database = null
async function connectMongoDb(dbUri) {
  const client = new MongoClient(dbUri)

  try {
    await client.connect()
    console.log('connect mongdb: success!')
    database = client.db('demo-mongo')
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close()
  }
}

function getDatabase() {
  return database
}

module.exports = {
  connectMongoDb,
  getDatabase,
}
