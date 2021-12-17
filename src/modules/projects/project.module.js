//import
import Projects from "./project.model.js";
import projectSchema from "./project.schema.js";
import projectResolver from "./project.resolver.js";
import { PHASES, PROJECT_STATUS } from "./project.constants.js";
import { Users, ROLES } from "../users/user.module.js";
import { Enrollments } from '../enrollments/enrollment.module.js';

export {
  Projects,
  projectSchema,
  projectResolver,
  PHASES,
  PROJECT_STATUS,
  ROLES,
  Users,
  Enrollments,
};
