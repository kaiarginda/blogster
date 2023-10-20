import mongoose from "mongoose";
import { connectMongoDB } from "@/mongo";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  posts: {
    type: [],
    default: [],
    required: true,
  },
  description: {
    required: true,
    type: [],
    default: [],
  },
  profilePic: {
    type: String,
    default:
      "https://pbs.twimg.com/profile_images/1652156749560905728/cEJKs_k4_400x400.png",
  },
  profession: {
    type: String,
    default: "User",
  },
  image: {
    type: [],
    default: [],

    required: true,
  },
  date: {
    type: String,
    default: new Date(),
  },
  postDate: {
    type: [],
    default: [],
  },
  postTopics: {
    type: [],
    default: [],
  },
  postComments: {
    type: [],
  },
});

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
