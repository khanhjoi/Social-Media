import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  authentication: {
    password: {type: String, required: true, select: false},
    salt: {type: String, select: false},
    sessionToken: {type: String, select: false},
  }
});

export const UserModel = mongoose.model('User', UserSchema);
// method contact to Model

export const getUsers = () => {
  return UserModel.find();
}

export const getUserByEmail = (email:string) => {
 return UserModel.findOne({email});
}

export const getUserById = (id:string) => {
  return UserModel.findById(id);
}

export const getUserBySessionToken = (sessionToken: string) => {
  return UserModel.findOne({
   'authentication.sessionToken': sessionToken,
  })
}

export const createUser = (values: Record<string, any>) => {
  new UserModel(values).save()
    .then((user) => {
      user.toObject();
    })
}

export const updateUser = (id: string, values: Record<string, any>) => {
  UserModel.findByIdAndUpdate(id, values);
}