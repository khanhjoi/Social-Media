import mongoose from "mongoose";

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
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  save: [{
    type: mongoose.Schema.Types.ObjectId,
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

export const PinModel = mongoose.model('Pin', PinSchema);

// all method contact to database

export const getPins = () => {
  return PinModel.find();
}

export const getPinById = (id: mongoose.Types.ObjectId) => {
  return PinModel.findById(id);
}

export const updatePin = (id: mongoose.Types.ObjectId, values: Record <string,any>) => {
  return PinModel.findByIdAndUpdate(id, values);
}