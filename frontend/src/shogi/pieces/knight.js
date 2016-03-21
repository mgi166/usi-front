import Piece from '../piece';
import * as CONST from '../constants/pieceTypes';

export default class Knight extends Piece {
  constructor({ type, x, y, movable = false, isPlaced =  false }) {
    super({ type, x, y, movable, isPlaced });

    if (this.type !== CONST.USI_KNIGHT_BLACK_TYPE &&
        this.type !== CONST.USI_KNIGHT_WHITE_TYPE &&
        this.type !== CONST.USI_KNIGHT_BLACK_PROMOTE_TYPE &&
        this.type !== CONST.USI_KNIGHT_WHITE_PROMOTE_TYPE) {
      throw new Error(`Unexpected type as Knight: type is ${this.type}`);
    }

    return this;
  }
}
