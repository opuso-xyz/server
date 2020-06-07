import * as mongoose from 'mongoose';

export interface TagModel extends mongoose.Document {
  _id: string;
  title: string;
  color: string;
}

export const TagSchema = new mongoose.Schema({
  title: { type: String, required: true },
  color: { type: String, required: true },
});

export const Tag = mongoose.model<TagModel>('Tag', TagSchema);
