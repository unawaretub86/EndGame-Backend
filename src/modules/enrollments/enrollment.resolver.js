/* eslint-disable no-unused-vars */
// models
import { Enrollments } from "./enrollment.module.js";
import { Projects } from "../projects/project.module.js";
import { Users } from "../users/user.module.js";

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

const project = async (parent) => {
  const project = await Projects.findById(parent.project_id);
  return project;
};

const student = async (parent) => {
  const student = await Users.findById(parent.user_id);
  return student;
};

export default {
  Query: {
    allEnrollments,
    enrollmentById,
  },
  Enrollment: {
    project,
    student,
  },
  Mutation: {
    changeStatusEnrollment,
  },
};
