export const rowSize = 20;
export const colSize = 10;
export const cellSize = 32;
export const borderSize = 4;

export const PLAYFIELD_X = 224;
export const NEXT_FIELD_X = 580;
export const HOLD_FIELD_X = 32;

export const FOREGROUND_COLOR = "250";

export enum ACTION {
  LEFT,
  RIGHT,
  UP,
  DOWN,
  ROTATE_LEFT,
  ROTATE_RIGHT,
}

export enum SHAPE {
  O = "O",
  J = "J",
  L = "L",
  S = "S",
  Z = "Z",
  T = "T",
  I = "I",
}

export const COLORS = [
  null,
  "#ff75fc",
  "#d342d6",
  "#9c72a5",
  "#b375c6",
  "#a64dc1",
  "#a431c6",
  "#cb34f9",
];

export const PLAYGROUND_COLOR = "#d8a4d6";
export const FIELD_STROKE_COLOR = PLAYGROUND_COLOR;
export const FIELD_COLOR = "#ecb1ef";
export const GHOST_COLOR = "#f7d3ff";

export const TYPES = {
  [SHAPE.O]: [
    [1, 1],
    [1, 1],
  ],

  [SHAPE.J]: [
    [2, null, null],
    [2, 2, 2],
    [null, null, null],
  ],

  [SHAPE.L]: [
    [null, null, 3],
    [3, 3, 3],
    [null, null, null],
  ],

  [SHAPE.S]: [
    [null, 4, 4],
    [4, 4, null],
    [null, null, null],
  ],

  [SHAPE.Z]: [
    [5, 5, null],
    [null, 5, 5],
    [null, null, null],
  ],

  [SHAPE.T]: [
    [null, 6, null],
    [6, 6, 6],
    [null, null, null],
  ],

  [SHAPE.I]: [
    [null, null, null, null],
    [7, 7, 7, 7],
    [null, null, null, null],
    [null, null, null, null],
  ],
};

Object.freeze(ACTION);
Object.freeze(SHAPE);
