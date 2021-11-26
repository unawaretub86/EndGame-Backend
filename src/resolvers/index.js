import userResolver from "../modules/users/user.resolver.js";
import projectResolver from "../modules/projects/project.resolver.js";

const { Query: userQueries, Mutation: userMutations, ...userRest } = userResolver;
const { Query: projectQueries, Mutation: projectMutations, ...projectRest } = projectResolver;

export default{
  Query: {
    ...userQueries,
    ...projectQueries,
  },
  Mutation: {
    ...userMutations,
    ...projectMutations,
  },
  ...userRest,
  ...projectRest
};
