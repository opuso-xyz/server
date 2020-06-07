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
        return newTag;
      } catch (e) {
        throw new Error(e);
      }
    }
  },

  async updateTag(parent, { id, title, color }, ctx: Context) {
    const userId = getUserId(ctx);
    const userDoc = await User.findById(userId).exec();
    const currentTag = userDoc.tags.find((t) => t._id.toString() === id.toString());
    if (!currentTag) {
      throw new Error("Tag doesn't exist!");
    }
    // If updating the title
    if (currentTag.title !== title) {
      // Check if there's already a tag with that title
      const existing = await User.find({
        tags: { $elemMatch: { title } },
      }).exec();
      // If so, then throw an error
      if (existing.length !== 0) {
        throw new Error('Tag already exists!');
      }
    }
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
