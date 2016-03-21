import Piece from '../piece';
import * as CONST from '../constants/pieceTypes';

export default class Lance extends Piece {
  constructor({ type, x, y, movable = false, isPlaced =  false }) {
    super({ type, x, y, movable, isPlaced });

    if (this.type !== CONST.USI_LANCE_BLACK_TYPE &&
        this.type !== CONST.USI_LANCE_WHITE_TYPE &&
        this.type !== CONST.USI_LANCE_BLACK_PROMOTE_TYPE &&
        this.type !== CONST.USI_LANCE_WHITE_PROMOTE_TYPE) {
      throw new Error(`Unexpected type as Lance: type is ${this.type}`);
    }

    return this;
  }
}
