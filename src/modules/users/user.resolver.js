import { Users } from "./user.module.js";

const allUsers = async () => {
  const users = await Users.find();
  return users;
};

const userById = async (parent, args) => {
  const user = await Users.findById(args._id);
  return user;
};

const addUser = async (parent, args) => {
  let user = new Users(args.input);
  user = await user.save();
  return user;
};

const updateUser = async (parent, args) => {
  let user = Users.findById(args._id);
  user = await user.updateOne(args.input);
  return user;
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
  },
};
