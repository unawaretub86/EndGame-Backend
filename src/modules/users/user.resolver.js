// import Users from "./user.model.js";

// export const querysUser = () => {
//   const allUsers = async (parent, args, context, info) => {
//     const users = await Users.find();
//     return users;
//   };

//   const user = async (parent, args, context, info) => {
//     const user = await Users.findById(args._id);
//     return user;
//   };
// };
// export const mutationsUser = () => {
//   const addUser = async (parent, args, context, info) => {
//     let user = new Users(args.input);
//     user = await user.save();
//     return user;
//   };
// };

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

export default {
  Query: {
    allUsers,
    user,
  },
  Mutation: {
    addUser,
  },
};
