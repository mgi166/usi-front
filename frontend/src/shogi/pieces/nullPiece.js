import Piece from '../piece';
import * as CONST from '../constants/pieceTypes';

export default class NullPiece extends Piece {
  constructor({ type, x, y, movable = false, isPlaced =  false }) {
    super({ type, x, y, movable, isPlaced });
    this.type = CONST.USI_NULL_TYPE;
    return this;
  }

  promote() {
    return this;
  }

  unpromote() {
    return this;
  }

  isPromoted() {
    return true;
  }

}
