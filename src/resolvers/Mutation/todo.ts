import {Context, getUserId} from '../../utils';

export const todo = {
  async createTodo(parent, { title, content, tags}, ctx: Context, info) {
    const userId = getUserId(ctx);
    return ctx.prisma.createTodo({
      title,
      content,
      tags,
      complete: false,
      owner: {
        connect: { id: userId }
      }
    })
  },

  async finishTodo(parent, {id}, ctx: Context, info) {
    const userId = getUserId(ctx);
    const todoExists = await ctx.prisma.$exists.todo({
      id,
      owner: {id: userId},
    });
    if (!todoExists) {
      throw new Error(`Todo not found or you're not the author!`);
    }

    return ctx.prisma.deleteTodo({id});
  },

  async updateTodo(parent, {id, ...props }, ctx: Context, info) {
    console.log(props);
    const userId = getUserId(ctx);
    const todoExists = await ctx.prisma.$exists.todo({
      id,
      owner: {id: userId},
    });
    if (!todoExists) {
      throw new Error(`Todo not found or you're not the author!`);
    }

    console.log(props.tags)

    return ctx.prisma.updateTodo({
      where: {id},
      data: { ...props}
    })
  }
}
