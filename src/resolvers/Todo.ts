import { Context} from '../utils';
import {User} from '../models/UserModel';

export const Todo = {
  owner: async ({ id }) => {
    const user = await User.findOne({todos: { $all: [id]}}).exec();
    user.id = user._id;
    return user;
  }
}
