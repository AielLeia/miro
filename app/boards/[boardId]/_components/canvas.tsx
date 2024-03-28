'use client';

import { pointerEventToCanvasPoint } from '@/lib/utils';
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
} from '@/liveblocks.config';
import { Camera, CanvasMode, CanvasState } from '@/types/canvas';
import React, { useCallback, useState } from 'react';

import CursorsPresence from '@/app/boards/[boardId]/_components/cursors-presence';
import Info from '@/app/boards/[boardId]/_components/info';
import Participants from '@/app/boards/[boardId]/_components/participants';
import Toolbar from '@/app/boards/[boardId]/_components/toolbar';

type CanvasProps = {
  boardId: string;
};

const Canvas = ({ boardId }: CanvasProps) => {
  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      const current = pointerEventToCanvasPoint(e, camera);

      setMyPresence({ cursor: current });
    },
    []
  );
  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({ x: camera.x - e.deltaX, y: camera.y - e.deltaY }));
  }, []);
  const onPointerLeave = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) =>
      setMyPresence({ cursor: null }),
    []
  );

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

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
      <svg
        className="h-[100vh] w-[100vw]"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
