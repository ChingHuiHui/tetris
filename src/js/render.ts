import {
  borderSize,
  cellSize,
  COLORS,
  colSize,
  FIELD_STROKE_COLOR,
  GHOST_COLOR,
  PLAYFIELD_X,
  PLAYGROUND_COLOR,
  rowSize,
  SHAPE,
  TYPES,
} from "./config";

import Field from "./field";
import Piece from "./piece";
import Pieces from "./pieces";
import Playfield from "./playField";

export default class Render {
  
  playfield: Playfield;
  pieces: Pieces;

  creativeLib;

  constructor(creativeLib, playfield, pieces) {
    this.playfield = playfield;
    this.pieces = pieces

    this.creativeLib = creativeLib;
  }

  renderPlayfield() {
    this.creativeLib.fill(PLAYGROUND_COLOR);
    this.creativeLib.noStroke();

    this.creativeLib.rect(
      PLAYFIELD_X + 2,
      2,
      cellSize * colSize + borderSize - 1,
      cellSize * rowSize + borderSize - 1
    );

    const grid = this.playfield.grid;

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        this.creativeLib.fill(grid[row][col]);

        this.creativeLib.noStroke();
        this.creativeLib.rect(
          PLAYFIELD_X + cellSize * col + borderSize,
          cellSize * row + borderSize,
          cellSize - 1,
          cellSize - 1
        );
      }
    }
  }

  renderPiece(piece: Piece): void {
    for (let row = 0; row < piece.shape.length; row++) {
      for (let col = 0; col < piece.shape[row].length; col++) {
        const cell = piece.shape[row][col];

        const x = piece.x + col;
        const y = piece.y + row;

        if (cell) {
          const color = piece.isGhost ? GHOST_COLOR : COLORS[cell];

          this.creativeLib.fill(color);

          this.creativeLib.rect(
            PLAYFIELD_X + cellSize * x + borderSize,
            cellSize * y + borderSize,
            cellSize - 1,
            cellSize - 1
          );
        }
      }
    }
  }

  renderField(field: Field) {
   
    // draw background;
    this.creativeLib.fill("#ffffff");
    this.creativeLib.stroke(FIELD_STROKE_COLOR);

    this.creativeLib.rect(
      field.fieldXPostion,
      2,
      cellSize * 5 + borderSize - 1,
      cellSize * 5 + borderSize - 1
    );

    this.creativeLib.noStroke();

    
    if(!field.piece) {
      return
    }

     // draw piece
     const pieceType = TYPES[field.piece.type];

     for (let row = 0; row < pieceType.length; row++) {
       for (let col = 0; col < pieceType[row].length; col++) {
         const cell = pieceType[row][col];
 
         const { type } = field.piece;
 
         const fixedPositionX = cellSize + field.fieldXPostion - 2 + borderSize;
         const fixedPositionY = cellSize + borderSize;
 
         let poistionX = cellSize * col;
         let poistionY = cellSize * row;
 
         if (type === SHAPE.I) {
           poistionX -= cellSize / 2;
         }
 
         if (type === SHAPE.O) {
           poistionX += cellSize / 2;
         }
 
         if (type !== SHAPE.I) {
           poistionY += cellSize / 2;
         }
 
         if (cell) {
           this.creativeLib.fill(COLORS[cell]);
           this.creativeLib.rect(
             fixedPositionX + poistionX,
             fixedPositionY + poistionY,
             cellSize - 1,
             cellSize - 1
           );
         }
       }
     }
 
 
  }
}
