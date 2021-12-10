// vendors
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
// import cors from "cors";
import http from "http";
import dotenv from "dotenv";

// Schemas
import { userSchema } from "./modules/users/user.module.js";
import { projectSchema } from "./modules/projects/project.module.js";
import { enrollmentSchema } from "./modules/enrollments/enrollment.module.js";
import { advanceSchema } from "./modules/advances/advance.module.js";

// resolvers
import { projectResolver } from "./modules/projects/project.module.js";
import { userResolver } from "./modules/users/user.module.js";
import { enrollmentResolver } from "./modules/enrollments/enrollment.module.js";
import { advanceResolver } from "./modules/advances/advance.module.js";

// middlewares
// eslint-disable-next-line no-undef
import validateAuthentication from "./middlewares/access.middlewares.js";

// utilities
import connect from "./database.js";

const typeDefs = [userSchema, projectSchema, enrollmentSchema, advanceSchema];
const resolvers = [
  projectResolver,
  userResolver,
  enrollmentResolver,
  advanceResolver,
];

// Initialization
dotenv.config();
connect();

const startApolloServer = async (typeDefs, resolvers) => {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    playground:true,
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],

    // Descomentar cuando se requiera acceso por token
    // context: async ({ req }) => await validateAuthentication(req),
  });
  await server.start();
  server.applyMiddleware({
    app,
    path: `${server.graphqlPath}`,
    playgroundPath: `${server.graphqlPath}/playground`
  });
  // app.use(cors());
  // app.use(server.getMiddleware());
  await new Promise((resolve) =>
  // eslint-disable-next-line no-undef
    httpServer.listen({ port: process.env.PORT }, resolve)
  );
  console.log(
    // eslint-disable-next-line no-undef
    `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
  );
};

startApolloServer(typeDefs, resolvers);
