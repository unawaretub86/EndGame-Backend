// models
import Enrollments from './enrollment.model.js';
import Projects from '../projects/project.model.js';
import Users from '../users/user.model.js';

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