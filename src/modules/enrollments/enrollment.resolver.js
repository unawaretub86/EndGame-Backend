// models
import {Enrollments} from './enrollment.module.js';
import {Projects} from '../projects/project.module.js';
import {Users} from '../users/user.module.js';

const addEnrollment = async (parent, args, context, info) => {
  let enrollment = new Enrollments(args.input);
  enrollment = await enrollment.save();
  return enrollment;
}

const allEnrollments = async (parent, args, context, info) => {
  const enrollments = await Enrollments.find();
  return enrollments;
};

const project = async (parent, args, context, info) => {
  const project = await Projects.findById(parent.project_id);
  return project;
};

const student = async (parent, args, context, info) => {
  const student = await Users.findById(parent.user_id);
  return student;
};

export default {
    Query: {
      allEnrollments
    },
    Mutation: {
      addEnrollment
    },
    Enrollment: {
      project,
      student,
    }
}