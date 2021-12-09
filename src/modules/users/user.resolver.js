import { Users } from "./user.module.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { USER_STATUS, ROLES } from "./user.constans.js";

// const allUsers = async (parent, args, { user, errorMessage }) => {
const allUsers = async (parent, args) => {
  // if (!user) {
  //   console.log(user);
  //   throw new Error(`${errorMessage} error de entrada`);
  // }
  // if (user.role !== ROLES.admin) {
  //   throw new Error("Access denied");
  // }
  return await Users.find();
};

const userById = async (parent, args) => {
  const user = await Users.findById(args._id);
  return user;
};

// Register / Login
const registerUser = async (parent, args) => {
  const user = new Users({
    ...args.input,
    status: USER_STATUS.pending,
    password: await bcrypt.hash(args.input.password, 12),
  });
  console.log(args.input);
  return user.save();
};

//login
const login = async (parent, args) => {
  const user = await Users.findOne({ email: args.email });
  if (!user) {
    throw new Error("User or password are Wrong");
  }
  const isValid = await bcrypt.compare(args.password, user.password);
  if (!isValid) {
    throw new Error("user or Password are Wrong");
  }
  // eslint-disable-next-line no-undef
  const token = await jwt.sign({ user }, process.env.SECRET, {
    expiresIn: "1h",
  });
  return token;
};

//Queries and mutations

const updateUser = async (parent, args) => {
  let userUpdated = await Users.findOneAndUpdate(
    { _id: args.input.userById },
    {
      name: args.input.name,
      email: args.input.email,
      documentId: args.input.documentId,
      lastName: args.input.lastName,
      password: args.input.password,
      fullName: args.input.fullName,
    },
    { new: true }
  );
  return userUpdated;
};

const updateStateAdmin = async (parent, args) => {
  let userUpdatedByAdmin = await Users.findOneAndUpdate(
    { _id: args.input.userById },
    {
      status: args.input.status,
    },
    { new: true }
  );
  return userUpdatedByAdmin;
};

const updateStateLeader = async (parent, args) => {
  let userUpdatedByLeader = await Users.findOneAndUpdate(
    { _id: args.input.userById },
    {
      status: args.input.status,
    },
    { new: true }
  );
  return userUpdatedByLeader;
};

const usersByRole = async (parent, args) => {
  const users = await Users.find({ role: args.role });
  return users;
};

const userByStatus = async (parent, args) => {
  const users = await Users.find({ status: args.status });
  return users;
};

export default {
  Query: {
    allUsers,
    userById,
    usersByRole,
    userByStatus,
    login,
  },
  Mutation: {
    registerUser,
    updateUser,
    updateStateAdmin,
    updateStateLeader,
  },
};
