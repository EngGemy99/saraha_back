import mongoose from "mongoose";

const connectDB = (app, port) => {
  mongoose
    .connect(process.env.URL_DB)
    .then(() => {
      console.log("DB connect successfully");
      app.listen(port, () => {
        console.log("Server Running......... ");
      });
    })
    .catch((error) => {
      console.log("error on DB");
    });
};

export default connectDB;
