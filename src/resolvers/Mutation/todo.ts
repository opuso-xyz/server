import { Context, getUserId } from '../../utils';
import { Todo } from '../../models/TodoModel';
import { User } from '../../models/UserModel';

const todo = {
  async createTodo(parent, { title, content, tags }, ctx: Context) {
    const userId = getUserId(ctx);
    const newTodo = new Todo({
      title,
      content,
      tags,
      owner: userId,
      complete: false,
    });
    const savedTodo = await newTodo.save();
    await User.findByIdAndUpdate(
      userId,
      { $push: { todos: savedTodo.id } },
      { new: true, upsert: true },
    ).exec();
    return savedTodo;
  },

  async finishTodo(parent, { id }, ctx: Context) {
    getUserId(ctx);
    const todoExists = await Todo.findById(id);
    if (!todoExists) {
      throw new Error('Todo not found or you\'re not the author!');
    } else if (todoExists.complete) {
      throw new Error('Todo already complete!');
    }
    return Todo.findOneAndUpdate(
      id,
      { complete: true },
      { upsert: true },
    ).exec();
  },

  async updateTodo(parent, { id, ...props }, ctx: Context): Promise<any> {
    getUserId(ctx);
    const todoExists = await Todo.findById(id);
    if (!todoExists) {
      throw new Error('Todo not found or you\'re not the author!');
    }
    return Todo.findByIdAndUpdate({ _id: id }, props, {
      upsert: true,
      new: true,
    }).exec();
  },

  async deleteTodo(parent, { id }, ctx: Context): Promise<any> {
    const userId = getUserId(ctx);
    const todoExists = await Todo.findById(id);
    if (!todoExists) {
      throw new Error('Todo not found or you\'re not the author!');
    }
    await User.update(
      { _id: userId },
      { $pull: { todos: id } },
      { multi: true },
    ).exec();
    return Todo.findOneAndDelete({ _id: id }).exec();
  },
};

export default todo;
