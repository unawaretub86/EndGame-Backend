import mongoose from "mongoose";
const { Schema } = mongoose;

const projectsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  generalObjective: {
    type: String,
    required: true,
  },
  specificObjectives: {
    type: [],
    required: true,
  },
  budget: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  leader_id: {
    type: Schema.ObjectId,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  phase: {
    type: String,
    enum: ["started", "inProgress", "ended"],
  },
});

const Projects = new mongoose.model("projects", projectsSchema);

export default Projects;
