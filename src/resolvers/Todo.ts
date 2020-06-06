import { Context, getUserId } from '../utils';
import { User } from '../models/UserModel';

const Todo = {
  owner: async ({ id }) => {
    const user = await User.findOne({ todos: { $all: [id] } }).exec();
    // eslint-disable-next-line no-underscore-dangle
    user.id = user._id;
    return user;
  },

  tags: async ({ tags }, args, ctx: Context) => {
    const id = getUserId(ctx);
    const user = await User.findById(id);
    tags = tags.map((tag) => ({ title: tag }));
    tags = tags.map((tag) => user.tags.find((item) => item.title === tag.title) || tag);
    return tags;
  },
};

export default Todo;
