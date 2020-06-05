import * as mongoose from 'mongoose';

export interface TagModel extends mongoose.Document {
  _id: string;
  name: string;
  color: string;
}

export const TagSchema = new mongoose.Schema({
  name: {type: String, required: true},
  color: {type: String, required: true}
})
