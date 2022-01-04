import Piece from "./piece";
import { SHAPE } from "./config";

export default class Pieces {
  currentPiece: Piece;
  nextPiece: Piece;
  ghostPiece: Piece;
  holdPiece: Piece;

  constructor() {
    this.currentPiece;
    this.nextPiece;
    this.ghostPiece;
    this.holdPiece;

    this.init();
  }

  init(): void {
    const currectShape = this.buildRandomShape();
    const nextShpae = this.buildRandomShape();

    this.currentPiece = this.buildPiece(currectShape);
    this.ghostPiece = this.buildPiece(currectShape, true);
    
    this.nextPiece = this.buildPiece(nextShpae);
  }

  buildRandomShape(): SHAPE {
    const randomIndex = Math.floor(Math.random() * Object.keys(SHAPE).length);

    return Object.values(SHAPE)[randomIndex];
  }

  buildPiece(shape, isGhost = false): Piece {
    return new Piece(shape, isGhost);
  }

  changeToNextPiece(): void {
    const newShape = this.buildRandomShape();

    this.currentPiece = this.nextPiece;
    this.nextPiece = this.buildPiece(newShape);
  }
}
