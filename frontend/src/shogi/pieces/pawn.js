import Piece from '../piece';
import * as CONST from '../constants/pieceTypes';

export default class Pawn extends Piece {
  constructor({ type, x, y, movable = false, isPlaced =  false }) {
    super({ type, x, y, movable, isPlaced });

    if (this.type !== CONST.USI_PAWN_BLACK_TYPE &&
        this.type !== CONST.USI_PAWN_WHITE_TYPE &&
        this.type !== CONST.USI_PAWN_BLACK_PROMOTE_TYPE &&
        this.type !== CONST.USI_PAWN_WHITE_PROMOTE_TYPE) {
      throw new Error(`Unexpected type as Pawn: type is ${this.type}`);
    }

    return this;
  }

  promote() {
    switch (this.type) {
    case CONST.USI_PAWN_BLACK_TYPE:
      return this.type = CONST.USI_PAWN_BLACK_PROMOTE_TYPE;
    case CONST.USI_PAWN_WHITE_TYPE:
      return this.type = CONST.USI_PAWN_WHITE_PROMOTE_TYPE;
    };
    return this;
  }

  unpromote() {
    switch (this.type) {
    case CONST.USI_PAWN_BLACK_PROMOTE_TYPE:
      return this.type = CONST.USI_PAWN_BLACK_TYPE;
    case CONST.USI_PAWN_WHITE_PROMOTE_TYPE:
      return this.type = CONST.USI_PAWN_WHITE_TYPE;
    };
    return this;
  }
}
