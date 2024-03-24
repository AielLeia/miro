'use client';

import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';

import BoardCard from '@/app/(dashboard)/_components/bord-card';
import EmptyBoards from '@/app/(dashboard)/_components/empty-boards';
import EmptyFavorites from '@/app/(dashboard)/_components/empty-favorites';
import EmptySearch from '@/app/(dashboard)/_components/empty-search';
import NewBoardButton from '@/app/(dashboard)/_components/new-board-button';

type BoardListProps = {
  organizationId: string;
  query: {
    favorites?: string;
    search?: string;
  };
};

const BoardList = ({ organizationId, query }: BoardListProps) => {
  const data = useQuery(api.boards.getBoards, { organizationId });

  if (data === undefined) {
    return (
      <div>
        <h2 className="text-3xl">
          {query.favorites ? 'Favorites board' : 'Teams board'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewBoardButton organizationId={organizationId} disabled />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }

  if (!data?.length && query.search) {
    return <EmptySearch />;
  }

  if (!data?.length && query.favorites) {
    return <EmptyFavorites />;
  }

  if (!data?.length) {
    return <EmptyBoards />;
  }

  return (
    <div>
      <h2 className="text-3xl">
        {query.favorites ? 'Favorites board' : 'Teams board'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewBoardButton organizationId={organizationId} />
        {data.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            imageUrl={board.imageUrl}
            authorId={board.authorId}
            authorName={board.authorName}
            createdAt={board._creationTime}
            organizationId={board.organizationId}
            isFavorites={false}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardList;
