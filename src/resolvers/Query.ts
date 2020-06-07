import { getUserId, Context } from '../utils';
import { User } from '../models/UserModel';
import { Todo } from '../models/TodoModel';

const Query = {
  me(parent, args, ctx: Context) {
    const id = getUserId(ctx);
    return User.findById(id);
  },
  async todos(parent, { tag }, ctx: Context) {
    const id = getUserId(ctx);
    const todos = await Todo.find({ owner: id }).exec();
    return todos.filter((todo) => todo.tags.includes(tag));
  },
};

export default Query;
