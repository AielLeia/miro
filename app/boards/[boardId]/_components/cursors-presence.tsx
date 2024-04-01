'use client';

import { colorToCss } from '@/lib/utils';
import { useOthersConnectionIds, useOthersMapped } from '@/liveblocks.config';
import { shallow } from '@liveblocks/react';
import { memo } from 'react';

import Cursor from '@/app/boards/[boardId]/_components/cursor';
import Path from '@/app/boards/[boardId]/_components/path';

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

const Drafts = () => {
  const others = useOthersMapped(
    (other) => ({
      pencilDraft: other.presence.pencilDraft,
      penColor: other.presence.penColor,
    }),
    shallow
  );

  return (
    <>
      {others.map(([key, other]) => {
        if (other.pencilDraft) {
          return (
            <Path
              key={key}
              x={0}
              y={0}
              points={other.pencilDraft}
              fill={other.penColor ? colorToCss(other.penColor) : '#000'}
            />
          );
        }

        return null;
      })}
    </>
  );
};

const CursorsPresence = memo(() => {
  return (
    <>
      <Drafts />
      <Cursors />
    </>
  );
});

CursorsPresence.displayName = 'CursorsPresence';

export default CursorsPresence;
