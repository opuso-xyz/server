import {Context, getUserId} from '../../utils';
import {Tag} from '../../models/TagModel';
import {User} from '../../models/UserModel';

export const tag = {
  async createTag(parent, { title, color}, ctx: Context) {
    const userId = getUserId(ctx);
    const tag = new Tag({
      title,
      owner: userId,
      color
    });
    await User.findByIdAndUpdate(userId, {"$push": {tags: tag}}, {"new": true, "upsert": true}).exec();
    return tag;
  },

  async updateTag(parent, { id, title, color}, ctx: Context) {
    const userId = getUserId(ctx);
    const userDoc = await User.findById(userId).exec();
    const tag = userDoc.tags.find(tag => tag.id === id);
    tag.title = title || tag.title;
    tag.color = color || tag.color;
    userDoc.tags.find(tag => tag.id === id).set(tag);
    await userDoc.save();
    return tag;
  },

  async deleteTag(parent, { id }, ctx: Context) {
    const userId = getUserId(ctx);
    return await User.findByIdAndUpdate(userId, {
      $pull: {
        tags: {_id: id}
      }
    }).exec();
  }
}
