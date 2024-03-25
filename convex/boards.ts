import { query } from './_generated/server';
import { info } from 'autoprefixer';
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

    const boardsWithFavoriteRelation = boards.map((board) => {
      return ctx.db
        .query('userFavorites')
        .withIndex('by_user_board', (q) =>
          q.eq('userId', identity.subject).eq('boardId', board._id)
        )
        .unique()
        .then((favorite) => ({
          ...board,
          isFavorites: !!favorite,
        }));
    });

    console.log(`Found ${boards.length} boards for ${args.organizationId}`);
    return Promise.all(boardsWithFavoriteRelation);
  },
});
