import Piece from '../piece';
import * as CONST from '../constants/pieceTypes';

export default class Gold extends Piece {
  constructor({ type, x, y, movable = false, isPlaced =  false }) {
    super({ type, x, y, movable, isPlaced });

    if (this.type !== CONST.USI_GOLD_BLACK_TYPE &&
        this.type !== CONST.USI_GOLD_WHITE_TYPE) {
      throw new Error(`Unexpected type as Gold: type is ${this.type}`);
    }

    return this;
  }
}
