// vendors
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import userSchema from './modules/users/user.schema.js';
import projectSchema from './modules/projects/project.module.js';

// middlewares
import validateAccess from './middlewares/access.middlewares.js';

// utilities
import connect from './database.js';

// typeDefs
// import typeDefs from './schema/index.js';
const typeDefs = [
  ...userSchema,
  ...projectSchema,
]

// resolvers
import resolvers from './resolvers/index.js';


// Initialization
dotenv.config();
connect();

const startApolloServer = async (typeDefs, resolvers) => {
  console.log("TYPEDEFS: " + typeDefs);
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  // server.applyMiddleware({ app });
  app.use(cors());
  app.use(server.getMiddleware());
  await new Promise(resolve => httpServer.listen({ port: process.env.PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
};

startApolloServer(typeDefs, resolvers);
