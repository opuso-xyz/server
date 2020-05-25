import { Context } from '../utils'

/**
 * Resolver for the User
 * posts returns all of the users posts
 * todos returns all of the users todos
 */
export const User = {
  todos: ({id}, args, ctx: Context) => {
    return ctx.prisma.user({id}).todos()
  }
}
