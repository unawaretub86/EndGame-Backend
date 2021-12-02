import {Users} from "./user.module.js";

const allUsers = async (parent, args, context, info) => {
  const users = await Users.find();
  return users;
};

const userById = async (parent, args, context, info) => {
  const user = await Users.findById(args._id);
  return user;
};

const addUser = async (parent, args, context, info) => {
  let user = new Users(args.input);
  user = await user.save();
  return user;
}

const usersByRole = async(parent, args, context, info) => {
  const users = await Users.find({ role: args.role });
  return users;
}

const userByStatus = async(parent, args, context, info) => {
  const users = await Users.find({ status: args.status });
  return users;
}

export default {
  Query: {
    allUsers,
    userById,
    usersByRole,
    userByStatus
  },
  Mutation: {
    addUser,
  }
}