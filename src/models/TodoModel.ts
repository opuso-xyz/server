import * as mongoose from 'mongoose';

export interface TodoModel extends mongoose.Document {
  _id: string;
  title: string;
  owner: string;
  content: string;
  dueDate: string;
  tags: [string]
  complete: boolean
}

export const TodoSchema = new mongoose.Schema({
  title: {type:String, required: true},
  content: {type:String},
  owner: {type:String, required: true},
  dueDate: {type: String},
  tags: {type: [String]},
  complete: {type: Boolean}
})

export const Todo = mongoose.model<TodoModel>('Todo', TodoSchema);
