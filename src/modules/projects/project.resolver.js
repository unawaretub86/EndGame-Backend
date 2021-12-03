import { Projects } from "./project.module.js";
import { Users } from "../users/user.module.js";

const allProjects = async () => {
  const projects = await Projects.find();
  return projects;
};

const addProject = async (parent, args) => {
  let project = new Projects(args.input);
  project = await project.save();
  return project;
};

const projectById = async (parent, args) => {
  const project = await Projects.findById(args._id);
  return project;
};

const updateProject = async (parent, args) => {
  const projectUpdated = await Projects.findOneAndUpdate(
    { _id: args.input.projectById },
    {
      name: args.input.name,
      generalObjective: args.input.generalObjective,
      specificObjectives: args.input.specificObjectives,
      budget: args.input.budget,
      startDate: args.input.startDate,
      endDate: args.input.endDate,
      status: args.input.status,
      phase: args.input.phase,
    },
    { new: true }
  );
  return projectUpdated;
};

const leader = async (parent) => {
  const user = await Users.findById(parent.leader_id);
  return user;
};

export default {
  Query: {
    allProjects,
    projectById,
  },
  Project: {
    leader,
  },
  Mutation: {
    addProject,
    updateProject,
  },
};
