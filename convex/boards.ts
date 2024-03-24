import { query } from './_generated/server';
import { v } from 'convex/values';

export const getBoards = query({
  args: {
    organizationId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    const boards = await ctx.db
      .query('boards')
      .withIndex('by_organization', (q) =>
        q.eq('organizationId', args.organizationId)
      )
      .order('desc')
      .collect();

    console.log(`Found ${boards.length} boards for ${args.organizationId}`);
    return boards;
  },
});
