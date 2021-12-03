/* eslint-disable no-unused-vars */
// models
import {Enrollments} from './enrollment.module.js';
import {Projects} from '../projects/project.module.js';
import {Users} from '../users/user.module.js';

const allEnrollments = async () => {
  const enrollments = await Enrollments.find();
  return enrollments;
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
        allEnrollments
    },
    Enrollment: {
        project,
        student,
    }
}