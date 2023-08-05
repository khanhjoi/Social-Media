import mongoose from "mongoose";

export const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true
  },
  id: String,
  image: String,
  author: {
    type: String,
    ref: 'User'
  }
});
