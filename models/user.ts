import { Schema, model } from "mongoose";
import { Enum_Role } from "./enums";

interface User {
  email: string;
  identification: string;
  name: string;
  lastname: string;
  role: Enum_Role;
}

const userSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
  },
  identification: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: Enum_Role,
  },
});

const UserModel = model("User", userSchema);

export { UserModel };
