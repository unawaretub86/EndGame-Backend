import userSchema from "../modules/users/user.schema.js";
import projectSchema from "../modules/projects/project.schema.js";

export default [
  ...userSchema,
  ...projectSchema,
]