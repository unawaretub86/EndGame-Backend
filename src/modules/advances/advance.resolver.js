/* eslint-disable no-unused-vars */
import {
    Advances, 
    Enrollments,
    ROLES,
    Projects,
    PHASES,
} from "./advance.module.js";


// Queries Resolvers
const allAdvances = async (parent, args, context, info) => {
  const advances = await Advances.find();
  return advances;
};

const advaceById = async (parent, args, context, info) => {
    const advance = await Advances.findById(args._id);
    return advance;
};

const allAdvancesByStudentId = async (parent, args, { user, errorMessage }) => {
  if (!user) {
    throw new Error(`${errorMessage} token error`);
  }
  if (user.role != ROLES.leader) {
    throw new Error("Access denied");
  }
  return await Advances.find({});
};

// Mutations Resolvers
const addObservation = async (parent, args, { user, errorMessage }) => {
  if (!user) {
    throw new Error(`${errorMessage} token error`);
  }
  if (user.role != ROLES.leader) {
    throw new Error("Access denied");
  }
  let advance = await Advances.findOneAndUpdate(
    { _id: args.input.advaceById },
    { observations: args.input.observations },
    { new: true }
  );
  return advance;
};

const addAdvance = async (parent, args, { user, errorMessage }) => {
  if (!user) {
    throw new Error(`${errorMessage} token error`);
  }
  if (user.role != ROLES.student) {
    throw new Error("Access denied");
  }
  
  let enrollment = await Enrollments.findById( args.input.enrollment_id );
  await Projects.findOneAndUpdate(
    { _id: enrollment.project_id },
    { phase: PHASES.inProgress },
    { new: true }
  );

  let advance = new Advances({
    ...args.input,
  });
  advance = await advance.save();
  return advance;
};

const advancesByLeaderId = async (parent, args, { user, errorMessage}) => {
  if(!user){
    throw new Error(`${user} Token error`);
  }
  if(user.role != ROLES.leader){
    throw new Error("Access denied");
  }

  let projects = await Projects.find({ leader_id: user._id });

  const projectsId = projects.map((e) => e._id);

  let enrollments = await Enrollments.find({ project_id: projectsId });

  const enrollmentsId = enrollments.map((e) => e._id);
  
  let advances = await Advances.find({enrollment_id: enrollmentsId});

  return advances;
}

const advancesByProjectId = async (parent, args, {user, errorMessage}) => {
  if (!user) {
    throw new Error(`${errorMessage} token error`);
  }

  let project = await Projects.findById(args._id);
  if (!project) {
    throw new Error("Project doesn't find");
  }

  let enrollments = await Enrollments.find({ project_id: project._id});

  const enrollmentsId = enrollments.map((e) => e._id);
  
  let advances = await Advances.find({enrollment_id: enrollmentsId});

  return advances;
};

const enrollment = async (parent, args, context, info) => {
    const enrollment = await Enrollments.findById(parent.enrollment_id);
    return enrollment;
};

export default {
    Query: {
        allAdvances,
        advaceById,
        advancesByProjectId,
        advancesByLeaderId,
    },
    Mutation: {
        addObservation,
        addAdvance,
    },
    Advance: {
        enrollment
    }
}