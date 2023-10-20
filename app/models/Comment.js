import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({});

const Comment =
  mongoose.models?.commentSchema || mongoose.model("Comment", commentSchema);

export default Comment;
