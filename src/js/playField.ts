import {
  ACTION,
  COLORS,
  FOREGROUND_COLOR,
  colSize,
  rowSize,
} from "./config";

import NextField from "./nextField";
import HoldField from "./holdField";

import Pieces from "./pieces";
import Piece from "./piece";

export default class Playfield {
  grid: string[][];
  nextField: NextField;
  holdField: HoldField;
  pieces: Pieces;
  foreground: string;

  isHolding: boolean;
  isOver: boolean;

  constructor(pieces) {
    this.grid = [];

    this.nextField = new NextField(pieces.nextPiece);
    this.holdField = new HoldField();

    this.pieces = pieces;

    this.foreground = FOREGROUND_COLOR;

    this.isHolding = false;
    this.isOver = false;

    this.init();
  }

  restart() {
    this.init();
    
    this.isOver = false;
  }

  init(): void {
    for (let i = 0; i < rowSize; i++) {
      this.grid[i] = new Array(colSize).fill(this.foreground);
    }
  }
  
  makeGhost(): void {
    if (!this.pieces.currentPiece) return;

    const ghostPiece = this.pieces.ghostPiece;

    // cp shape ghostPiece
    ghostPiece.copy(this.pieces.currentPiece);

    while (!this.willCollide(ghostPiece)) {
      ghostPiece.move(ACTION.DOWN);
    }

    ghostPiece.move(ACTION.UP);
  }

  private clearLine(row): void {
    this.grid.splice(row, 1);
    this.grid.unshift(new Array(colSize).fill(this.foreground));
  }

  private addToGrid(piece): void {
    const cells = piece.shape;

    for (let row = 0; row < cells.length; row++) {
      for (let col = 0; col < cells[row].length; col++) {
        if (!cells[row][col]) {
          continue;
        }

        const gridRow = piece.y + row;
        const gridCol = piece.x + col;

        const cellColor = COLORS[cells[row][col]];

        this.grid[gridRow][gridCol] = cellColor;
      }
    }

    for (let row = 0; row < this.grid.length; row++) {
      if (!this.grid[row].includes(this.foreground)) {
        this.clearLine(row);
      }
    }
  }

  private willCollide(piece): boolean {
    const x = piece.x;
    const y = piece.y;
    const shape = piece.shape;

    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (!shape[row][col]) {
          continue;
        }

        if (
          x + col < 0 ||
          x + col >= colSize ||
          y + row >= rowSize ||
          this.grid[y + row][x + col] !== FOREGROUND_COLOR
        ) {
          return true;
        }
      }
    }

    return false;
  }

  private savePiece(): void {
    this.isHolding = false;

    if (this.willCollide(this.pieces.nextPiece)) {
      this.isOver = true;
    }

    this.addToGrid(this.pieces.currentPiece);
    this.changeToNextPiece();
  }

  private changeToNextPiece(): void {
    if (this.isOver) return;

    this.pieces.changeToNextPiece();

    this.nextField = new NextField(this.pieces.nextPiece);
  }

  moveCurrentPieceRight(): void {
    const currentPiece = this.pieces.currentPiece;

    currentPiece.move(ACTION.RIGHT);

    if (this.willCollide(this.pieces.currentPiece)) {
      currentPiece.move(ACTION.LEFT);
    }
  }

  moveCurrentPieceLeft(): void {
    const currentPiece = this.pieces.currentPiece;

    currentPiece.move(ACTION.LEFT);

    if (this.willCollide(this.pieces.currentPiece)) {
      currentPiece.move(ACTION.RIGHT);
    }
  }

  moveCurrentPieceDown(): void {
    const currentPiece = this.pieces.currentPiece;

    currentPiece.move(ACTION.DOWN);

    if (this.willCollide(this.pieces.currentPiece)) {
      currentPiece.move(ACTION.UP);

      this.savePiece();
    }
  }

  rotateCurrentPiece(): void {
    const currentPiece = this.pieces.currentPiece;

    currentPiece.move(ACTION.ROTATE_RIGHT);

    if (this.willCollide(this.pieces.currentPiece)) {
      currentPiece.move(ACTION.ROTATE_LEFT);
    }
  }

  forcedDrop(): void {
    const currentPiece = this.pieces.currentPiece;

    while (!this.willCollide(currentPiece)) {
      this.moveCurrentPieceDown();
    }
  }

  holdTheCurrentPiece(): void {
    if (this.isHolding) {
      return;
    }

    this.isHolding = true;

    if (!this.pieces.holdPiece) {
      this.saveHoldPiece(this.pieces.currentPiece);

      this.changeToNextPiece();

      return;
    }

    const tempToStoreCurrent = this.pieces.currentPiece;
    this.pieces.currentPiece = this.pieces.holdPiece;

    this.saveHoldPiece(tempToStoreCurrent);
  }

  private saveHoldPiece(piece): void {
    this.pieces.holdPiece = new Piece(piece.type);

    this.holdField = new HoldField(this.pieces.holdPiece);
  }


  public show(): void {
    this.nextField.show();
    this.holdField.show();
  }
}
