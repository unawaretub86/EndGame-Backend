import Projects from "./project.model.js";
import Users from "../users/user.model.js";
import moduleName from "graphql-tools";

const allProjects = async () => {
  const projects = await Projects.find();
  return projects;
};

const project = async (parent, args, context, info) => {
  const user = await Projects.findById(args._id);
  return user;
};

const leader = async (parent, args, context, info) => {
  const user = await Users.findById(parent.leader_id);
  return user;
};

// export default {
//   Query: {
//     allProjects,
//     project,
//   },
//   Project: {
//     leader,
//   },
// };
