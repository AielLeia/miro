'use client';

import { useOthersConnectionIds } from '@/liveblocks.config';
import { memo } from 'react';

import Cursor from '@/app/boards/[boardId]/_components/cursor';

const Cursors = () => {
  const ids = useOthersConnectionIds();

  return (
    <>
      {ids.map((connectionId) => (
        <Cursor key={connectionId} connectionId={connectionId} />
      ))}
    </>
  );
};

const CursorsPresence = memo(() => {
  return (
    <>
      {/* TODO: Draft pencil */}
      <Cursors />
    </>
  );
});

CursorsPresence.displayName = 'CursorsPresence';

export default CursorsPresence;
