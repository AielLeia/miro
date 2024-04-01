'use client';

import { colorToCss } from '@/lib/utils';
import { useStorage } from '@/liveblocks.config';
import { LayerType } from '@/types/canvas';
import React, { memo } from 'react';

import Ellipse from '@/app/boards/[boardId]/_components/ellipse';
import Note from '@/app/boards/[boardId]/_components/note';
import Path from '@/app/boards/[boardId]/_components/path';
import Rectangle from '@/app/boards/[boardId]/_components/rectangle';
import Text from '@/app/boards/[boardId]/_components/text';

type LayerPreviewProps = {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
};

const LayerPreview = memo(
  ({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));

    if (!layer) {
      return null;
    }

    switch (layer.type) {
      case LayerType.Rectangle:
        return (
          <Rectangle
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Ellipse:
        return (
          <Ellipse
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Text:
        return (
          <Text
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Note:
        return (
          <Note
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Path:
        return (
          <Path
            x={layer.x}
            y={layer.y}
            points={layer.points}
            onPointerDown={(e) => onLayerPointerDown(e, id)}
            fill={layer.fill ? colorToCss(layer.fill) : '#000'}
            stroke={selectionColor}
          />
        );
      default:
        return null;
    }
  }
);

LayerPreview.displayName = 'LayerPreview';

export default LayerPreview;
