import Users from "./user.model.js";

const allUsers = async (parent, args, context, info) => {
  const users = await Users.find();
  return users;
};

const user = async (parent, args, context, info) => {
  const user = await Users.findById(args._id);
  return user;
};

const addUser = async (parent, args, context, info) => {
  let user = new Users(args.input);
  user = await user.save();
  return user;
};

const updateUser = async (parent, args, context, info) => {
  let user = Users.findById(args._id);
  user = await user.updateOne(args.input);
  return user;
};

export default {
  Query: {
    allUsers,
    user,
  },
  Mutation: {
    addUser,
    updateUser,
  },
};
