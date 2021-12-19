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


const enrollment = async (parent, args, context, info) => {
    const enrollment = await Enrollments.findById(parent.enrollment_id);
    return enrollment;
};

export default {
    Query: {
        allAdvances,
        advaceById
    },
    Mutation: {
        addObservation,
        addAdvance
    },
    Advance: {
        enrollment
    }
}