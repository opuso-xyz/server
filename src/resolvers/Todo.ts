import { Context} from '../utils';

export const Todo = {
  owner: ({ id }, args, ctx:Context) => {
    return ctx.prisma.todo({id}).owner();
  }
}
