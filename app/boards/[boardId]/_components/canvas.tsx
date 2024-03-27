'use client';

import { useSelf } from '@/liveblocks.config';

import Info from '@/app/boards/[boardId]/_components/info';
import Participants from '@/app/boards/[boardId]/_components/participants';
import Toolbar from '@/app/boards/[boardId]/_components/toolbar';

type CanvasProps = {
  boardId: string;
};

const Canvas = ({ boardId }: CanvasProps) => {
  const info = useSelf((me) => me.info);

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar />
    </main>
  );
};

export default Canvas;
