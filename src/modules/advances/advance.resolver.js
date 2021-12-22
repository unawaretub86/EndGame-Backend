/* eslint-disable no-unused-vars */
import {
  Advances,
  Enrollments,
  ROLES,
  Projects,
  PHASES,
} from "./advance.module.js";

// Queries
const allAdvances = async (parent, args, context, info) => {
  const advances = await Advances.find();
  return advances;
};

// const allAdvancesByProject = async (parent, args, { user, errorMessage }) => {
//   if (!user) {
//     throw new Error(`${errorMessage} token error`);
//   }
//   const advances = await Enrollments.find({ project_id: args._id });

//   console.log(advances);

//   let projects = await Advances.find({});

//   return projects;
// };

const advaceById = async (
  pareallAdvancesByStudentIdnt,
  args,
  context,
  info
) => {
  const advance = await Advances.findById(args._id);
  return advance;
};

const allAdvancesByStudentId = async (parent, args, { user, errorMessage }) => {
  if (!user) {
    throw new Error(`${errorMessage} token error`);
  }
  // if (user.role != ROLES.student) {
  //   throw new Error("Access denied");
  // }
  return await Advances.find({ enrollment_id: args._id });
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
    { 
      observations: args.input.observations,
      leaderDate: new Date(),
    },
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

  let enrollment = await Enrollments.findById(args.input.enrollment_id);
  await Projects.findOneAndUpdate(
    { _id: enrollment.project_id },
    { 
      phase: PHASES.inProgress,
      addDate: new Date(),
    },
    { new: true }
  );

  let advance = new Advances({
    ...args.input,
  });
  advance = await advance.save();
  return advance;
};

const advancesByProjectId = async (parent, args, { user, errorMessage }) => {

  if (!user) {
    throw new Error(`${errorMessage} token error`);
  }

  let project = await Projects.findById(args._id);
  if (!project) {
    throw new Error("Project doesn't find");
  }

  let enrollments = await Enrollments.find({ project_id: project._id });

  const enrollmentsId = enrollments.map((e) => e._id);

  let advances = await Advances.find({ enrollment_id: enrollmentsId });

  return advances;
};

const updateAdvance = async (parent, args, { user, errorMessage }) => {
  if (!user) {
    throw new Error(`${errorMessage} token error`);
  }
  let advanceUpdated = await Advances.findOneAndUpdate(
    { _id: args.input.advaceById },
    {
      description: args.input.description,
      addDate: new Date(),
    },
    { new: true }
  );
  return await advanceUpdated;
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
    allAdvancesByStudentId,
  },
  Mutation: {
    addObservation,
    addAdvance,
    updateAdvance,
  },
  Advance: {
    enrollment,
  },
};
