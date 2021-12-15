import {
  Projects,
  PROJECT_STATUS,
  PHASES,
  Users,
  ROLES,
} from "./project.module.js";

// eslint-disable-next-line no-unused-vars
// const userExist = async (parent, args, { user, errorMessage }) => {
//   if (!user) {
//     throw new Error(`${errorMessage} that user does't exist`);
//   }
//   console.log(user.name);
//   return user;
// };

const allProjects = async (parent, args, { user, errorMessage }) => {
  if (!user) {
    console.log(user);
    throw new Error(`${errorMessage} token error`);
  }
  if (user.role !== ROLES.admin) {
    throw new Error(`${errorMessage} Access denied `);
  }
  return await Projects.find();
};

// const setEndedProject = async (parent, args {user, errorMessage}) =>{
//   if(!user )
// }

const addProject = async (parent, args, { user, errorMessage }) => {
  if (!user) {
    throw new Error(`${errorMessage} token error`);
  }
  if (user.role != ROLES.admin) {
    throw new Error(`access denied`);
  }
  let project = new Projects({
    ...args.input,
    leader_id: user._id,
    status: PROJECT_STATUS.inactive,
    startDate: new Date(),
  });
  project = await project.save();
  return project;
};

const projectById = async (parent, args, { user, errorMessage }) => {
  if (!user) {
    throw new Error(`${errorMessage} token error`);
  }
  if (user.role != ROLES.admin) {
    throw new Error(`access denied`);
  }
  const project = await Projects.findById(args._id);
  return project;
};

//pending solve issue date in sandbox
const updateProject = async (parent, args, { user, errorMessage }) => {
  let projectToUpdate = await Projects.findById(args.input.projectById);
  if (!projectToUpdate) {
    throw new Error("Project doesn't exists");
  }
  if (!user) {
    throw new Error(`${errorMessage} token error`);
  }
  if (user.role != ROLES.admin) {
    throw new Error(`access denied`);
  }
  const projectUpdated = await Projects.findOneAndUpdate(
    { _id: args.input.projectById },
    {
      name: args.input.name,
      generalObjective: args.input.generalObjective,
      specificObjectives: args.input.specificObjectives,
      budget: args.input.budget,
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

  if (!leader) {
    throw new Error("Leader does not exist");
  }

  const projects = await Projects.find({ leader_id: leader._id });

  return projects;
};

const changePhaseProject = async (parent, args, { user, errorMessage }) => {
  let project = await Projects.findById(args.input._id);

  if (!project) {
    throw new Error("Project does not exist");
  }

  if (project.phase === "ended") {
    throw new Error("Project ended");
  }
  if (!user) {
    throw new Error(`{${errorMessage} token error}`);
  }
  if (user.role !== ROLES.admin) {
    throw new Error("Access denied");
  }
  if (args.input.phase === "ended" && args.phase === "inProgress") {
    let projectUpdated = await Projects.findOneAndUpdate(
      { _id: args.input._id },
      {
        status: args.input.status,
        endDate: new Date(),
      },
      { new: true }
    );
    return projectUpdated;
  }
};

const activateProject = async (parent, args, { user, errorMessage }) => {
  if (!user) {
    throw new Error(`${errorMessage}. Access error`);
  }
  if (user.role !== ROLES.admin) {
    throw new Error("Access denied");
  }

  let project = await Projects.findById(args.input._id);

  if (!project) {
    throw new Error("Project does not exist");
  }

  if (project.phase === "ended") {
    throw new Error("Project ended");
  }

  if (!project.phase) {
    project = await Projects.findOneAndUpdate(
      { _id: args.input._id },
      {
        startDate: new Date(),
        status: args.input.status,
        phase: PHASES.started,
      },
      { new: true }
    );

    return project;
  }

  project = await Projects.findOneAndUpdate(
    { _id: args.input._id },
    {
      status: args.input.status,
    },
    { new: true }
  );

  return project;
};

const inactivateProject = async (parent, args, { user, errorMessage }) => {
  if (!user) {
    throw new Error(`${errorMessage}. Access error`);
  }
  if (user.role !== ROLES.admin) {
    throw new Error("Access denied");
  }

  let project = await Projects.findById(args.input._id);

  if (!project) {
    throw new Error("Project does not exist");
  }

  project = await Projects.findOneAndUpdate(
    { _id: args.input._id },
    {
      status: args.input.status,
    },
    { new: true }
  );

  return project;
};

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
    activateProject,
    changePhaseProject,
    inactivateProject,
    updateProject,
  },
};
