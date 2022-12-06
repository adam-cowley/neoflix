import { Neo4jGraphQL } from "@neo4j/graphql"
import { ApolloServer, gql } from "apollo-server"
import neo4j from 'neo4j-driver'
import { config } from "dotenv";

const typeDefs = gql`
  type Movie {
    tmdbId: String
    title: String!
    poster: String
    languages: [String]
    imdbRating: Float!
    favorite: Boolean
    released: Date!
    actors: [Person!]! @relationship(type: "ACTED_IN", direction: IN)
    directors: [Person!]! @relationship(type: "DIRECTED", direction: IN)
  }

  type Person {
    tmdbId: String
    name: String
    roles: [Movie!]! @relationship(type: "ACTED_IN", direction: OUT, properties: "ActedInProperties")
    directed: [Movie!]! @relationship(type: "DIRECTED", direction: OUT)
  }

  interface ActedInProperties @relationshipProperties {
    role: String
  }

  type User {
    userId: String
    email: String
    name: String
    favorites: [Movie!]! @relationship(type: "HAS_FAVORITE", direction: OUT)
  }
`

// Load config from .env
config()

// Create Driver instance
const {
  NEO4J_URI,
  NEO4J_USERNAME,
  NEO4J_PASSWORD
} = process.env

if ( !NEO4J_URI ) {
  throw new Error(`Could not find NEO4J_URI, have you defined it in .env?`)
}
if ( !NEO4J_USERNAME ) {
  throw new Error(`Could not find NEO4J_USERNAME, have you defined it in .env?`)
}
if ( !NEO4J_PASSWORD ) {
  throw new Error(`Could not find NEO4J_PASSWORD, have you defined it in .env?`)
}

const driver = neo4j.driver(
  NEO4J_URI,
  neo4j.auth.basic(
    NEO4J_USERNAME,
    NEO4J_PASSWORD
  )
)

// Create Neo4jGraphQL Schema
const neoSchema = new Neo4jGraphQL({
  typeDefs,
  driver
})

neoSchema
  .getSchema()
  .then((schema) => {
    const server = new ApolloServer({
      schema,
    })

    server.listen()
      .then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
      })
})