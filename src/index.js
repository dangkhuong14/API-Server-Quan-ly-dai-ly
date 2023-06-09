import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import pool from './database/pool.js';
import typeDefs from './graphql/schema.js';
import resolvers from './graphql/resolvers.js';

const server = new ApolloServer({
    typeDefs, resolvers,
    context: { pool },
    introspection: true
});

startStandaloneServer(server, { listen: { port: process.env.PORT || 5000 }, }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});