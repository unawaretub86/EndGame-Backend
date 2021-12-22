/* eslint-disable no-unused-vars */
// models
import {
  Enrollments,
  Projects,
  Users,
  Advances,
  USER_STATUS,
  ROLES,
  STATUS,
} from "./enrollment.module.js";

const addEnrollment = async (parent, args, { user, errorMessage }) => {
  if (!user) {
    throw new Error(`${errorMessage}...`);
  }
  if (user.role !== ROLES.student) {
    throw new Error("Access denied");
  }

  let enrollment = new Enrollments({
    ...args.input,
  });
  let isEnrollmentSave = enrollment.save();
  if (!isEnrollmentSave) {
    throw new Error("Enrollment not saved");
  }
  enrollment = isEnrollmentSave;
  return enrollment;
};

const allEnrollments = async () => {
  const enrollments = await Enrollments.find();
  return enrollments;
};

const enrollmentById = async (parent, args) => {
  const enrollment = await Enrollments.findById(args._id);
  return enrollment;
};

const changeStatusEnrollment = async (parent, args) => {
  let enrollUpdated = await Enrollments.findOneAndUpdate(
    { _id: args.input._id },
    {
      status: args.input.status,
      enrollmentDate: new Date(),
    },
    { new: true }
  );
  return enrollUpdated;
};

// const changePhaseEnrollment = async (parent, args, { user, errorMessage }) => {
//   if (!user) {
//     throw new Error(`{${errorMessage} token error}`);
//   }
//   if (user.role !== ROLES.admin) {
//     throw new Error("Access denied");
//   }
//   if (args.input.phase === "ended" && args.phase === "in progress") {
//     let enrollUpdated = await Enrollments.findOneAndUpdate(
//       { _id: args.input._id },
//       {
//         status: args.input.status,
//         enrollmentDate: new Date(),
//       },
//       { new: true }
//     );
//     return enrollUpdated;
//   }
// };

// Returns a list of enrollments where user is enroll
const enrollmentByUserId = async (parent, args) => {
  const user = await Users.findById(args.user_id);

  if (!user) {
    throw new Error("User does not exist");
  }

  const enrollments = await Enrollments.find({ user_id: user._id });
  return enrollments;
};

const project = async (parent) => {
  const project = await Projects.findById(parent.project_id);
  return project;
};

const student = async (parent, args) => {
  const student = await Users.findById(parent.user_id);
  return student;
};

const advances = async (parent) => {
  let advances = await Advances.find({ enrollment_id: parent._id });
  return advances;
}

export default {
  Query: {
    allEnrollments,
    enrollmentById,
    enrollmentByUserId,
  },
  Enrollment: {
    project,
    student,
    advances,
  },
  Mutation: {
    changeStatusEnrollment,
    addEnrollment,
  },
};
