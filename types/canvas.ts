export type Color = { r: number; g: number; b: number };

export type Camera = { x: number; y: number };

export enum LayerType {
  Rectangle,
  Ellipse,
  Path,
  Text,
  Note,
}

type AbstractLayer = {
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};

export type RectangleLayer = AbstractLayer & {
  type: LayerType.Rectangle;
};

export type EllipseLayer = AbstractLayer & {
  type: LayerType.Ellipse;
};

export type PathLayer = AbstractLayer & {
  type: LayerType.Path;
  points: number[][];
};

export type TextLayer = AbstractLayer & {
  type: LayerType.Text;
};

export type NoteLayer = AbstractLayer & {
  type: LayerType.Note;
};

export type Point = {
  x: number;
  y: number;
};

export type XYWH = {
  x: number;
  y: number;
  height: number;
  width: number;
};

export enum Side {
  Top = 1,
  Bottom = 2,
  Left = 4,
  Right = 8,
}

export type CanvasState =
  | { mode: CanvasMode.None }
  | { mode: CanvasMode.Pressing; origin: Point }
  | { mode: CanvasMode.SelectionNet; origin: Point; current?: Point }
  | { mode: CanvasMode.Translating; current: Point }
  | {
      mode: CanvasMode.Inserting;
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Note;
    }
  | { mode: CanvasMode.Resizing; initialBounds: XYWH; corner: Side }
  | { mode: CanvasMode.Pencil };

export enum CanvasMode {
  None,
  Pressing,
  SelectionNet,
  Translating,
  Inserting,
  Resizing,
  Pencil,
}

export type Layer =
  | RectangleLayer
  | EllipseLayer
  | PathLayer
  | TextLayer
  | NoteLayer;
