/* eslint import/first: "off" */
require('dotenv').config()

import { ApolloServer } from 'apollo-server'
import { resolvers, typeDefs } from './graphql'
import { getTasksAsync } from './get-tasks'
import { getMembersAsync } from './get-members'

const context = async (_session: any) => ({
  getStories: () => {},
  getTasks: getTasksAsync,
  getMembers: getMembersAsync,
})

const server = new ApolloServer({ typeDefs, resolvers, context })
// The `listen` method launches a web server.
server.listen({port: process.env.PORT || 4000}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
