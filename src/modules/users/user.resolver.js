import { Users } from "./user.module.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { USER_STATUS, ROLES } from "./user.constans.js";

const allUsers = async (parent, args, { user, errorMessage }) => {
  if (!user) {
    throw new Error(`${errorMessage} input error`);
  }
  if (user.role !== ROLES.admin) {
    throw new Error("Access denied");
  }
  return await Users.find();
};

const allStudents = async (parent, args) => {
  //Todo: Validate that the user who required this query is a leader

  return await Users.find({ role: ROLES.student });
};

const userById = async (parent, args) => {
  const user = await Users.findById(args._id);
  return user;
};

// Register
const registerUser = async (parent, args) => {
  const user = new Users({
    ...args.input,
    status: USER_STATUS.pending,
    password: await bcrypt.hash(args.input.password, 12),
  });
  console.log(args.input);
  const isUserSaved = user.save();
  if (!isUserSaved){
    throw new Error("User not saved")
  }
  return "Ok!"
};

//login, returns token
const login = async (parent, args) => {

  // Validate user's existence
  const user = await Users.findOne({ email: args.input.email });
  if (!user) {
    throw new Error("User or Password are Wrong");
  }

  // Validate password
  const isValid = await bcrypt.compare(args.input.password, user.password);
  if (!isValid) {
    throw new Error("User or Password are Wrong");
  }

  // Validate status
  if (user.status !== USER_STATUS.authorized){
    throw new Error("User unauthorized")
  }

  // Token creation
  const token = await jwt.sign(
    { 
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      status: user.status

      // eslint-disable-next-line no-undef
    }, process.env.SECRET, {
    expiresIn: "24h",
  });
  return token;
};

//Queries and mutations

const updateUser = async (parent, args, { user, errorMessage }) => {

  if (!user){
    throw new Error(`${errorMessage} token error`);
  }

  // const userToUpdate = await Users.findById(user._id);
  // console.log(String(user._id));
  // console.log(String(userToUpdate._id));
  // if (String(userToUpdate.email) === String(args.input.email)){
  //   console.log("user valid");
  // }

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
    allStudents
  },
  Mutation: {
    registerUser,
    updateUser,
    updateStateAdmin,
    updateStateLeader,
    login,
  },
};
