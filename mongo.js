import mongoose from "mongoose";

export const connectMongoDB = async () => {
  const DB =
    "mongodb+srv://tornikee:tornikee@cluster0.tj7kbt4.mongodb.net/?retryWrites=true&w=majority";

  mongoose
    .connect(DB, {
      useNewUrlParser: true,
    })
    .then(() => console.log("DB connnection successful!"));
};
