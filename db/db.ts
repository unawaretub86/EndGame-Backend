import { connect } from "mongoose";

const connectDB = async () => {
  return await connect(
    "mongodb+srv://admin:adminendgame@gestionproyectosendgame.fwabc.mongodb.net/GestionDeProyectos?retryWrites=true&w=majority"
  )
    .then(() => {
      console.log("Successful connection");
    })
    .catch((e) => {
      console.error("Error connecting to the DB", e);
    });
};

export default connectDB;
