import * as mongoose from "mongoose";

export interface UserModel extends mongoose.Document {
  password: string;
  email: string;
  name: string;
  todos: [string]
}

export const UserSchema = new mongoose.Schema({
  name: {type:String, required: true},
  email: {type: mongoose.Schema.Types.String, required: true, unique: true},
  password: {type: String, required: true},
  todos: {type: [String]},
})

export const User = mongoose.model<UserModel>('User', UserSchema);
