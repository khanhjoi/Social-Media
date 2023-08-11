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
    required: false
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

export const getPinByInformation = (information: string) => {
  return PinModel.find({
    $or: [
      { title: { $regex: information } },
      { about: { $regex: information } }
    ]
  });
};

export const createPinModel = (values: Record<string, any>) => {
   return PinModel.create(values);
}

export const uploadComment = (id: String, comment: Record<string, any>) => {
  return PinModel.findByIdAndUpdate(id, {
    $push: { comments: comment },
  });
}

export const savePin = (id: string, userId: String) => {
  return PinModel.findByIdAndUpdate(id, {
    $push: {
      Save: userId,
    }
  })
}

export const removeSavePin = (id: string, userId: String) => {
  return PinModel.findByIdAndUpdate(id, {
    $pull: {
      Save: userId,
    }
  })
}

export const findPinsSaveByIds = (ids: string[]) => {
  return PinModel.find({
    _id: {
      $in: ids,
    },
  });
};

export const findPinsCreateById = (id: string) => {
  return PinModel.find({
    userId: {
      $all: id,
    },
  });
};