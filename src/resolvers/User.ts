import { Todo } from '../models/TodoModel';

const User = {
  todos: ({ id }) => Todo.find({ owner: id }),
};

export default User;
