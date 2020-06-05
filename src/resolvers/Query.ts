import { getUserId, Context } from '../utils'
import {User} from '../models/UserModel';

export const Query = {

  me(parent, args, ctx: Context) {
    const id = getUserId(ctx)
    return User.findById(id);
  },

}
