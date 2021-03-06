import jwt from "jsonwebtoken";
// import Users from "../modules/users/user.model.js";

const validateAuthentication = async (req) => {
  const token = req.headers.authorization;
  try {
    // eslint-disable-next-line no-undef
    const session = await jwt.verify(token, process.env.SECRET);
    return {
      user: session
    };
  } catch (error) {
    return {
      errorMessage: error.message,
    };
  }
};

export default validateAuthentication;
