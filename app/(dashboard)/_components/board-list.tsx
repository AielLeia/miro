'use client';

import EmptyBoards from '@/app/(dashboard)/_components/empty-boards';
import EmptyFavorites from '@/app/(dashboard)/_components/empty-favorites';
import EmptySearch from '@/app/(dashboard)/_components/empty-search';

type BoardListProps = {
  organizationId: string;
  query: {
    favorites?: string;
    search?: string;
  };
};

const BoardList = ({ organizationId, query }: BoardListProps) => {
  const data = []; // TODO: Change to api call

  if (!data?.length && query.search) {
    return <EmptySearch />;
  }

  if (!data?.length && query.favorites) {
    return <EmptyFavorites />;
  }

  if (!data?.length) {
    return <EmptyBoards />;
  }

  return <div>{JSON.stringify(query)}</div>;
};

export default BoardList;
