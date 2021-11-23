// import connectDB from "./db/db";
// import { UserModel } from "./models/user";
// import { Enum_Role } from "./models/enums";

// const main = async () => {
//   await connectDB();

//   // CREATE USER
//   await UserModel.create({
//     lastname: "Mejia",
//     email: "vivi@cc.com",
//     identification: "123456",
//     name: "vivian",
//     role: Enum_Role.administrator,
//   })
//     .then((u) => {
//       console.log("user created", u);
//     })
//     .catch((e) => {
//       console.error("Error creating user", e);
//     });
////////////////////////////////////
  // GET USERS
  // await UserModel.find()
  //   .then((u) => {
  //     console.log('users', u);
  //   })
  //   .catch((e) => {
  //     console.error('error getting users', e);
  //   });
////////////////////////////////////
// };
// main();
