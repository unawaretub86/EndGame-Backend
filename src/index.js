// vendors
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";

// Schemas
import  { userSchema }  from "./modules/users/user.module.js";
import { projectSchema } from "./modules/projects/project.module.js";

// resolvers
import { projectResolver } from "./modules/projects/project.module.js";
import { userResolver } from "./modules/users/user.module.js";

// middlewares
import validateAccess from "./middlewares/access.middlewares.js";

// utilities
import connect from "./database.js";


const typeDefs = [userSchema, projectSchema];
const resolvers = [projectResolver, userResolver];

// Initialization
dotenv.config();
connect();

const startApolloServer = async (typeDefs, resolvers) => {
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
  await new Promise((resolve) =>
    httpServer.listen({ port: process.env.PORT }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
  );
};

startApolloServer(typeDefs, resolvers);
