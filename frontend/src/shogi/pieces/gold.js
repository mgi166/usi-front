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

  promote() {
    // NOTE: Do nothing. because gold can't promote.
    return this;
  }

  unpromote() {
    // NOTE: Do nothing. because gold can't promote.
    return this;
  }

  isPromoted() {
    // NOTE: gold can't promote, so behaves always promoted.
    return true;
  }

  moveDef() {
    switch (this.type) {
    case CONST.USI_GOLD_BLACK_TYPE:
      return { just: [[1, -1], [1, 0], [1, 1], [0, -1], [0, 1], [-1, 0]] };
    case CONST.USI_GOLD_WHITE_TYPE:
      return { just: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, 0]] };
    }
  }
}
