import { Context, getUserId } from '../../utils';
import { Tag } from '../../models/TagModel';
import { User } from '../../models/UserModel';

const tag = {
  async createTag(parent, { title, color }, ctx: Context) {
    const userId = getUserId(ctx);
    const newTag = new Tag({
      title,
      owner: userId,
      color,
    });
    const existing = await User.find({
      tags: { $elemMatch: { title } },
    }).exec();
    if (existing.length !== 0) {
      throw Error('Tag already exists!');
    } else {
      try {
        await User.findByIdAndUpdate(
          userId,
          { $push: { tags: newTag } },
          { new: true, upsert: true },
        ).exec();
        return tag;
      } catch (e) {
        throw new Error(e);
      }
    }
  },

  async updateTag(parent, { id, title, color }, ctx: Context) {
    const userId = getUserId(ctx);
    const userDoc = await User.findById(userId).exec();
    const currentTag = userDoc.tags.find((t) => t.id === id);
    currentTag.title = title || currentTag.title;
    currentTag.color = color || currentTag.color;
    userDoc.tags.find((foundTag) => foundTag.id === id).set(currentTag);
    try {
      await userDoc.save();
    } catch (e) {
      throw new Error(e);
    }
    return currentTag;
  },

  async deleteTag(parent, { id }, ctx: Context) {
    const userId = getUserId(ctx);
    return User.findByIdAndUpdate(userId, {
      $pull: {
        tags: { _id: id },
      },
    }).exec();
  },
};

export default tag;
