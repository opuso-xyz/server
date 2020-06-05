import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { Context } from '../../utils'
import {User} from '../../models/UserModel';

export const auth = {
  async signup(parent, args) {
    const password = await bcrypt.hash(args.password, 10);
    const todo = new User({
      ...args,
      password
    });
    let user;
    try {
      user = await todo.save();
    } catch (e) {
      throw Error(e);
    }
    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },

  async login(parent, { email, password }, ctx: Context) {
    const user = await User.findOne({email: email}).exec();
    if (!user) {
      throw new Error(`No such user found for email: ${email}`)
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },
}
