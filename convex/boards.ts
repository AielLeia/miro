import { query } from './_generated/server';
import { getAllOrThrow } from 'convex-helpers/server/relationships';
import { v } from 'convex/values';

export const getBoards = query({
  args: {
    organizationId: v.string(),
    search: v.optional(v.string()),
    favorites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    if (args.favorites) {
      const favoritedBoard = await ctx.db
        .query('userFavorites')
        .withIndex('by_user_organization', (q) =>
          q
            .eq('userId', identity.subject)
            .eq('organizationId', args.organizationId)
        )
        .order('desc')
        .collect();

      const ids = favoritedBoard.map((board) => board.boardId);

      const boards = await getAllOrThrow(ctx.db, ids);

      console.log(
        `Found ${boards.length} favorites boards for ${args.organizationId}`
      );
      return boards.map((board) => ({ ...board, isFavorites: true }));
    }

    const title = args.search;
    let boards = [];

    if (title) {
      boards = await ctx.db
        .query('boards')
        .withSearchIndex('search_title', (q) =>
          q.search('title', title).eq('organizationId', args.organizationId)
        )
        .collect();
    } else {
      boards = await ctx.db
        .query('boards')
        .withIndex('by_organization', (q) =>
          q.eq('organizationId', args.organizationId)
        )
        .order('desc')
        .collect();
    }

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
