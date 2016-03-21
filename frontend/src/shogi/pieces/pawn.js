import Piece from '../piece';
import * as CONST from '../constants/pieceTypes';

export default class Pawn extends Piece {
  constructor({ type, x, y, movable = false, isPlaced =  false }) {
    super({ type, x, y, movable, isPlaced });

    if (this.isBlack()) {
      this.type = CONST.USI_PAWN_BLACK_TYPE;
    } else if (this.isWhite()) {
      this.type = CONST.USI_PAWN_WHITE_TYPE;
    } else {
      throw new Error(`Unexpected type as Pawn: type is ${this.type}`);
    }

    return this;
  }
}
