/* eslint-disable no-unused-vars */
import { Users } from "./user.module.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { USER_STATUS, ROLES } from "./user.module.js";

// function to finish about verify if userExists
// const userExist = async (parent, args, { user, errorMessage }) => {
//   if (!user) {
//     throw new Error(`${errorMessage} that user does't exist`);
//   }
//   console.log(user.name);
//   return await Users.find();
// };

// Queries
const usersByRole = async (parent, args, { user, errorMessage }) => {
  if (!user) {
    throw new Error(`${errorMessage} token error`);
  }
  if (user.role != ROLES.admin) {
    throw new Error("Access denied");
  }

  return await Users.find({ role: args.role });
};

const userByStatus = async (parent, args, { user, errorMessage }) => {
  if (!user) {
    throw new Error(`${errorMessage} token error`);
  }
  if (user.role == ROLES.student) {
    throw new Error("Access denied");
  }
  return await Users.find({ status: args.status });
};

const allUsers = async (parent, args, { user, errorMessage }) => {
  if (!user) {
    console.log(user);
    throw new Error(`${errorMessage} token error`);
  }
  if (user.role !== ROLES.admin) {
    throw new Error("Access denied");
  }
  return await Users.find();
};

const allStudents = async (parent, args, { user, errorMessage }) => {
  if (!user) {
    console.log(user);
    throw new Error(`${errorMessage} token error`);
  }
  if (user.role !== ROLES.leader) {
    throw new Error("Access denied");
  }
  return await Users.find({ role: ROLES.student });
};

const userById = async (parent, args, { user, errorMessage }) => {
  let userToFind = await Users.findById(args._id);
  if (!userToFind) {
    throw new Error("User doesn't exists");
  }
  if (!user) {
    throw new Error(`${errorMessage} token error`);
  }
  console.log(args._id);
  return await Users.findById(args._id);
};

//Mutations

// Register
const registerUser = async (parent, args) => {
  const user = new Users({
    ...args.input,
    status: USER_STATUS.pending,
    password: await bcrypt.hash(args.input.password, 12),
  });
  console.log(args.input);
  const isUserSaved = await user.save();
  if (!isUserSaved) {
    throw new Error("User not saved");
  }
  return "Ok!";
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
  if (user.status !== USER_STATUS.authorized) {
    throw new Error("User unauthorized");
  }

  // Token creation
  const token = await jwt.sign(
    {
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      status: user.status,
    },
    // eslint-disable-next-line no-undef
    process.env.SECRET,
    {
      expiresIn: "24h",
    }
  );
  return token;
};

const updateUser = async (parent, args, { user, errorMessage }) => {
  if (!user) {
    throw new Error(`${errorMessage} token error`);
  }
  let userUpdated = await Users.findOneAndUpdate(
    { _id: user._id },
    {
      name: args.input.name,
      email: args.input.email,
      documentId: args.input.documentId,
      lastName: args.input.lastName,
      password: await bcrypt.hash(args.input.password, 12),
    },
    { new: true }
  );
  return userUpdated;
};

const updateStateAdmin = async (parent, args, { user, errorMessage }) => {
  let userToUpdate = await Users.findById(args.input.userById);
  if (!userToUpdate) {
    throw new Error("User doesn't exists");
  }
  if (!user) {
    throw new Error(`${errorMessage} token error`);
  }
  if (user.role !== ROLES.admin) {
    throw new Error("Access denied");
  }
  let userUpdatedByAdmin = await Users.findOneAndUpdate(
    { _id: args.input.userById },
    {
      status: args.input.status,
    },
    { new: true }
  );
  return await userUpdatedByAdmin;
};

const updateStateLeader = async (parent, args, { user, errorMessage }) => {
  let userToUpdate = await Users.findById(args.input.userById);
  if (!userToUpdate) {
    throw new Error("User doesn't exists");
  }
  if (!user) {
    throw new Error(`${errorMessage} token error`);
  }
  if (user.role != ROLES.leader) {
    throw new Error("Access denied");
  }
  if (userToUpdate.role != ROLES.student) {
    throw new Error("Access denied that user must be a student");
  }
  let userUpdatedByLeader = await Users.findOneAndUpdate(
    { _id: args.input.userById },
    {
      status: args.input.status,
    },
    { new: true }
  );
  return userUpdatedByLeader;
};

export default {
  Query: {
    allUsers,
    userById,
    allStudents,
    usersByRole,
    userByStatus,
  },
  Mutation: {
    login,
    registerUser,
    updateUser,
    updateStateAdmin,
    updateStateLeader,
  },
};
