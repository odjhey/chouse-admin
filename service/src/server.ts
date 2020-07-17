/* eslint import/first: "off" */
require('dotenv').config()

import { ApolloServer } from 'apollo-server'
import { resolvers, typeDefs } from './graphql'
import { getTasksAsync } from './get-tasks'

const context = async (_session: any) => ({
  getStories: () => {},
  getTasks: getTasksAsync,
})

const server = new ApolloServer({ typeDefs, resolvers, context })
// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
