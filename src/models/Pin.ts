import mongoose from "mongoose";

import { CommentSchema } from "./Comments";

const PinSchema = new mongoose.Schema({
  title: {
    type: String
  },
  about: {
    type: String
  },
  destination: {
    type: String
  },
  category: {
    type: String,
  },
  image: {
    public_id: String,
    url: String
  },
  userId: {
    type: String
  },
  postedBy: {
    type: String,
  },
  save: [{
    type: mongoose.Schema.Types.ObjectId,
  }],
  comments: [CommentSchema]
});

export const PinModel = mongoose.model('Pin', PinSchema);

// all method contact to database

export const getPins = (categoryId: String) => {
  if(categoryId) {
    return PinModel.find({category: categoryId});
  }
  return PinModel.find();
}

export const getPinById = (id: mongoose.Types.ObjectId) => {
  return PinModel.findById(id);
}

export const createPinModel = (values: Record<string, any>) => {
   return PinModel.create(values);
}

export const updatePin = (id: mongoose.Types.ObjectId, values: Record <string,any>) => {
  return PinModel.findByIdAndUpdate(id, values);
}