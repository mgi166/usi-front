import Base from './base';
import * as CONST from '../constants/pieceTypes';

export default class Gold extends Base {
  constructor({ type, x, y, movable = false, isDrop =  false }) {
    super({ type, x, y, movable, isDrop });

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

  toOpponentPiece() {
    this.clearPositonalAttrs();
    switch (this.type) {
    case CONST.USI_GOLD_BLACK_TYPE:
      this.type = CONST.USI_GOLD_WHITE_TYPE;
      break;
    case CONST.USI_GOLD_WHITE_TYPE:
      this.type = CONST.USI_GOLD_BLACK_TYPE;
      break;
    }
    return this;
  }

  moveDef() {
    switch (this.type) {
    case CONST.USI_GOLD_BLACK_TYPE:
      return { just: CONST.USI_GOLD_BLACK_MOVE_DEF };
    case CONST.USI_GOLD_WHITE_TYPE:
      return { just: CONST.USI_GOLD_WHITE_MOVE_DEF };
    }
  }
}
