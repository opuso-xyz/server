import { Context, getUserId } from '../utils';
import User from './User';
import { TodoModel } from '../models/TodoModel';

const Tag = {
  todos: async ({ title }, args, ctx: Context): Promise<TodoModel[]> => {
    const id = getUserId(ctx);
    const userTodos = await User.todos({ id });
    return userTodos.filter((todo) => todo.tags.includes(title));
  },
};

export default Tag;
