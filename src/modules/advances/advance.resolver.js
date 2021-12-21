/* eslint-disable no-unused-vars */
import { Advances, Enrollments } from "./advance.module.js";
import { ROLES } from "../users/user.module.js";
import Projects from "../projects/project.model.js";

// Queries
const allAdvances = async (parent, args, context, info) => {
  const advances = await Advances.find();
  return advances;
};

const allAdvancesByProject = async (parent, args, { user, errorMessage }) => {
  if (!user) {
    throw new Error(`${errorMessage} token error`);
  }
  const advances = await Enrollments.find({ project_id: args._id });

  console.log(advances);

  let projects = await Advances.find({});

  return projects;
};

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
  let advance = new Advances({
    ...args.input,
  });
  advance = await advance.save();
  return advance;
};

const enrollment = async (parent, args, context, info) => {
  const enrollment = await Enrollments.findById(parent.enrollment_id);
  return enrollment;
};

export default {
  Query: {
    allAdvances,
    advaceById,
    allAdvancesByStudentId,
    allAdvancesByProject,
  },
  Mutation: {
    addObservation,
    addAdvance,
  },
  Advance: {
    enrollment,
  },
};
