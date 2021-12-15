//import
import Projects from "./project.model.js";
import projectSchema from "./project.schema.js";
import projectResolver from "./project.resolver.js";
import { PHASE } from "./project.enum.js";
import { Users } from "../users/user.module.js";

export  {
    Projects,
    projectSchema,
    projectResolver,
    PHASE,
    Users,
};