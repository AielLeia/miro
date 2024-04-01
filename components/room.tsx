'use client';

import { RoomProvider } from '@/liveblocks.config';
import { Layer } from '@/types/canvas';
import { LiveList, LiveMap, LiveObject } from '@liveblocks/client';
import { ClientSideSuspense } from '@liveblocks/react';
import { ReactNode } from 'react';

type RoomProps = {
  roomId: string;
  children: ReactNode;
  fallback: NonNullable<ReactNode> | null;
};

const Room = ({ children, roomId, fallback }: RoomProps) => {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
        selection: [],
        pencilDraft: null,
        penColor: null,
      }}
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList<string>(),
      }}
    >
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default Room;
