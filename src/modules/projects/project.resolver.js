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

//pending solve issue date in sandbox
const updateProject = async (parent, args) => {
  const projectUpdated = await Projects.findOneAndUpdate(
    { _id: args.input.projectById },
    {
      name: args.input.name,
      generalObjective: args.input.generalObjective,
      specificObjectives: args.input.specificObjectives,
      budget: args.input.budget,
      // startDate: args.input.startDate,
      // endDate: args.input.endDate,
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

const projectByPhase = async (parent, args) => {
  const projects = await Projects.find({ phase: args.phase });
  return projects;
};

const projectByStatus = async (parent, args) => {
  const project = await Projects.find({ status: args.status });
  return project;
};

// returns a project's list where user is leader of those
const projectByLeaderId = async (parent, args) => {

  const leader = await Users.findById(args.leader_id);

  if(!leader){
    throw new Error("Leader does not exist");
  }

  const projects = await Projects.find({ leader_id: leader._id });

  return projects;
}

const activetProject = async (parent, args) => {
  // TODO: Validate user.role === admin

  let project = await Projects.findById(args.input._id);
  
  if (!project) {
    throw new Error("Project does not exist");
  }

  if (project.phase === 'ended'){
    throw new Error("Project ended");
  }

  if (!project.phase) {
    project = await Projects.findOneAndUpdate(
      {_id: args.input._id},
      {
        startDate: new Date(),
        status: args.input.status
      },
      { new: true }
    );
  }

  project = await Projects.findOneAndUpdate(
    {_id: args.input._id},
    {
      status: args.input.status
    },
    { new: true }
  );

  return project;
}

export default {
  Query: {
    allProjects,
    projectById,
    projectByStatus,
    projectByPhase,
    projectByLeaderId,
  },
  Project: {
    leader,
  },
  Mutation: {
    addProject,
    updateProject,
    activetProject,
  },
};
