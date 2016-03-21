import Piece from '../piece';
import * as CONST from '../constants/pieceTypes';

export default class Silver extends Piece {
  constructor({ type, x, y, movable = false, isPlaced =  false }) {
    super({ type, x, y, movable, isPlaced });

    if (this.type !== CONST.USI_SILVER_BLACK_TYPE &&
        this.type !== CONST.USI_SILVER_WHITE_TYPE &&
        this.type !== CONST.USI_SILVER_BLACK_PROMOTE_TYPE &&
        this.type !== CONST.USI_SILVER_WHITE_PROMOTE_TYPE) {
      throw new Error(`Unexpected type as Silver: type is ${this.type}`);
    }

    return this;
  }

  promote() {
    switch (this.type) {
    case CONST.USI_SILVER_BLACK_TYPE:
      return this.type = CONST.USI_SILVER_BLACK_PROMOTE_TYPE;
    case CONST.USI_SILVER_WHITE_TYPE:
      return this.type = CONST.USI_SILVER_WHITE_PROMOTE_TYPE;
    };
    return this;
  }
}
