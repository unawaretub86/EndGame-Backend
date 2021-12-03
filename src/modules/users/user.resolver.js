import { Users } from "./user.module.js";

const allUsers = async () => {
  const users = await Users.find();
  return users;
};

const userById = async (parent, args) => {
  const user = await Users.findById(args._id);
  return user;
};

// Mutations
const addUser = async (parent, args) => {
  let user = new Users(args.input);
  user = await user.save();
  return user;
};

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
  },
  Mutation: {
    addUser,
    updateUser,
    updateStateAdmin,
    updateStateLeader,
  },
};
