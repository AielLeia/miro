'use client';

import { useDeleteLayers } from '@/hooks/use-delete-layers';
import { useSelectionBounds } from '@/hooks/use-selection-bounds';
import { useMutation, useSelf } from '@/liveblocks.config';
import { Camera, Color } from '@/types/canvas';
import { Trash2 } from 'lucide-react';
import { Dispatch, memo, SetStateAction } from 'react';

import ColorPicker from '@/app/boards/[boardId]/_components/color-picker';
import Hint from '@/components/hint';
import { Button } from '@/components/ui/button';

type SelectionToolsProps = {
  camera: Camera;
  setLastUsedColor: Dispatch<SetStateAction<Color>>;
};

const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);
    const selectionBounds = useSelectionBounds();

    const deleteLayer = useDeleteLayers();

    const setFill = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get('layers');
        setLastUsedColor(fill);

        selection.forEach((id) => liveLayers.get(id)?.set('fill', fill));
      },
      [selection, setLastUsedColor]
    );

    if (!selectionBounds) return null;

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;
    return (
      <div
        className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
        style={{
          transform: `translate(calc(${x}px - 50%), calc(${y - 16}px - 100%))`,
        }}
      >
        <ColorPicker onChange={setFill} />
        <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
          <Hint label={'Delete'}>
            <Button variant="board" size="icon" onClick={deleteLayer}>
              <Trash2 />
            </Button>
          </Hint>
        </div>
      </div>
    );
  }
);

SelectionTools.displayName = 'SelectionTools';

export default SelectionTools;
