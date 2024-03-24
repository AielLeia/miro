import { Id } from './_generated/dataModel';
import { mutation } from './_generated/server';
import { v } from 'convex/values';

const images = [
  '/placeholders/1.svg',
  '/placeholders/2.svg',
  '/placeholders/3.svg',
  '/placeholders/4.svg',
  '/placeholders/5.svg',
  '/placeholders/6.svg',
  '/placeholders/7.svg',
  '/placeholders/8.svg',
  '/placeholders/9.svg',
  '/placeholders/10.svg',
];

export const createNewBoard = mutation({
  args: {
    organizationId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    const image = images[Math.floor(Math.random() * images.length)];
    return await ctx.db.insert('boards', {
      title: args.title,
      organizationId: args.organizationId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: image,
    });
  },
});

export const removeBoard = mutation({
  args: {
    id: v.string(),
  },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    const board = await ctx.db.get(id as Id<'boards'>);

    if (board?.authorId !== identity.subject) {
      throw new Error('Unauthorized to delete this resource');
    }

    // TODO: Later check to delete favorite relation

    await ctx.db.delete(id as Id<'boards'>);

    console.log(`Board ${id} deleted`);
  },
});

export const updateBoardTitle = mutation({
  args: {
    id: v.string(),
    title: v.string(),
  },
  handler: async (ctx, { title, id }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    const board = await ctx.db.get(id as Id<'boards'>);

    if (board?.authorId !== identity.subject) {
      throw new Error('Unauthorized to delete this resource');
    }

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      throw new Error('Title is required');
    }

    if (trimmedTitle.length > 60) {
      throw new Error('Title cannot be longer than 60 characters');
    }

    await ctx.db.patch(id as Id<'boards'>, {
      title: trimmedTitle,
    });

    console.log(`Board with ${id} patched a new title '${trimmedTitle}'`);

    return id;
  },
});
