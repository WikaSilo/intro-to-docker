const { ApolloServer, gql } = require('apollo-server')
const Redis = require('ioredis')
const redis = new Redis(
  `redis://:Pj9BwWcmzBar3HPv1UrPiNKlZyeJknhc@redis-10794.c267.us-east-1-4.ec2.cloud.redislabs.com:10794`
)

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
]

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: async () => {
      try {
        let data = await redis.get('books')
        data = JSON.parse(data)

        console.log(data)

        if (data) {
          return data
        } else {
          await redis.set('books', JSON.stringify(books))
          return books
        }
      } catch (err) {
        console.log(err)
        throw 'Internal Server Error'
      }
    },
  },
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers })

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
