import { getUserId, Context } from '../utils';
import { User } from '../models/UserModel';

const Query = {
  me(parent, args, ctx: Context) {
    const id = getUserId(ctx);
    return User.findById(id);
  },
};

export default Query;
