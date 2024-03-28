'use client';

import { useCanRedo, useCanUndo, useHistory } from '@/liveblocks.config';
import { CanvasMode, CanvasState } from '@/types/canvas';
import { useState } from 'react';

import Info from '@/app/boards/[boardId]/_components/info';
import Participants from '@/app/boards/[boardId]/_components/participants';
import Toolbar from '@/app/boards/[boardId]/_components/toolbar';

type CanvasProps = {
  boardId: string;
};

const Canvas = ({ boardId }: CanvasProps) => {
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        redo={history.undo}
        undo={history.redo}
      />
    </main>
  );
};

export default Canvas;
