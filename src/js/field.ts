import Piece from "./piece";

export default class Field {
  piece: Piece;
  fieldXPostion: number;

  constructor(piece: Piece | null) {
    this.piece = piece;
  }
}
