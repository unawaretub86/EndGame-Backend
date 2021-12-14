import mongoose from "mongoose";
const { Schema } = mongoose;

const usersSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    documentId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "leader", "student"],
    },
    status: {
      type: String,
      enum: ["pending", "authorized", "unauthorized"],
    },
    password: {
      type: String,
    },
  },
  { versionKey: false }
);

const Users = new mongoose.model("users", usersSchema);

export default Users;
