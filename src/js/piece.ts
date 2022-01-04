import {
  TYPES,
  ACTION,
} from "./config";


export default class Piece {
  type: string;
  shape: number[][];
  x: number;
  y: number;
  isGhost: boolean;

  constructor(type: string, isGhost: boolean = false) {
    this.type = type;
    this.shape = TYPES[type];

    this.x = 5;
    this.y = 0;

    this.isGhost = isGhost;
  }

  private rotateLeft(): void {
    const firstRow = this.shape[0];

    this.shape = firstRow.map((_, index) =>
      this.shape.map((row) => row[firstRow.length - index - 1])
    );
  }

  private rotateRight(): void {
    const firstRow = this.shape[0];

    this.shape = firstRow.map((_, index) =>
      this.shape.map((row) => row[index]).reverse()
    );
  }

  public move(action: ACTION): void {
    switch (action) {
      case ACTION.RIGHT:
        this.x++;
        break;
      case ACTION.LEFT:
        this.x--;
        break;
      case ACTION.UP:
        this.y--;
        break;
      case ACTION.DOWN:
        this.y++;
        break;
      case ACTION.ROTATE_LEFT:
        this.rotateLeft();
        break;
      case ACTION.ROTATE_RIGHT:
        this.rotateRight();
        break;
    }
  }

  public copy({ x, y, shape }): void {
    this.x = x;
    this.y = y;
    this.shape = shape;
  }
}
