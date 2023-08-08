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
  userImg: String,
  postedBy: {
    type: String,
  },
  Save: [{
    type: String,
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

export const getPinById = (id: String) => {
  return PinModel.findById(id);
}

export const createPinModel = (values: Record<string, any>) => {
   return PinModel.create(values);
}

export const updatePin = (id: mongoose.Types.ObjectId, values: Record <string,any>) => {
  return PinModel.findByIdAndUpdate(id, values);
}

export const uploadComment = (id: String, comment: Record<string, any>) => {
  return PinModel.findByIdAndUpdate(id, {
    $push: { comments: comment },
  });
}

export const savePin = (id: string, userId: String) => {
  return PinModel.findByIdAndUpdate(id, {
    $push: {
      save: userId,
    }
  })
}

export const removeSavePin = (id: string, userId: String) => {
  return PinModel.findByIdAndUpdate(id, {
    $pull: {
      save: userId,
    }
  })
}