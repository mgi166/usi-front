import Base from './base';
import * as CONST from '../constants/pieceTypes';

export default class Knight extends Base {
  constructor({ type, x, y, movable, isDrop, dropped }) {
    super({ type, x, y, movable, isDrop, dropped });

    if (this.type !== CONST.USI_KNIGHT_BLACK_TYPE &&
        this.type !== CONST.USI_KNIGHT_WHITE_TYPE &&
        this.type !== CONST.USI_KNIGHT_BLACK_PROMOTE_TYPE &&
        this.type !== CONST.USI_KNIGHT_WHITE_PROMOTE_TYPE) {
      throw new Error(`Unexpected type as Knight: type is ${this.type}`);
    }

    return this;
  }

  promote() {
    switch (this.type) {
    case CONST.USI_KNIGHT_BLACK_TYPE:
      return this.type = CONST.USI_KNIGHT_BLACK_PROMOTE_TYPE;
    case CONST.USI_KNIGHT_WHITE_TYPE:
      return this.type = CONST.USI_KNIGHT_WHITE_PROMOTE_TYPE;
    };
    return this;
  }

  unpromote() {
    switch (this.type) {
    case CONST.USI_KNIGHT_BLACK_PROMOTE_TYPE:
      return this.type = CONST.USI_KNIGHT_BLACK_TYPE;
    case CONST.USI_KNIGHT_WHITE_PROMOTE_TYPE:
      return this.type = CONST.USI_KNIGHT_WHITE_TYPE;
    };
    return this;
  }

  isPromoted() {
    switch (this.type) {
    case CONST.USI_KNIGHT_BLACK_PROMOTE_TYPE:
      return true;
    case CONST.USI_KNIGHT_WHITE_PROMOTE_TYPE:
      return true;
    default:
      return false;
    }
  }

  toOpponentPiece() {
    this.clearPositonalAttrs();
    switch (this.type) {
    case CONST.USI_KNIGHT_BLACK_TYPE:
    case CONST.USI_KNIGHT_BLACK_PROMOTE_TYPE:
      this.type = CONST.USI_KNIGHT_WHITE_TYPE;
      break;
    case CONST.USI_KNIGHT_WHITE_TYPE:
    case CONST.USI_KNIGHT_WHITE_PROMOTE_TYPE:
      this.type = CONST.USI_KNIGHT_BLACK_TYPE;
      break;
    }
    return this;
  }

  moveDef() {
    switch (this.type) {
    case CONST.USI_KNIGHT_BLACK_TYPE:
      return { just: [[-1, -2], [1, -2]] };
    case CONST.USI_KNIGHT_WHITE_TYPE:
      return { just: [[-1, 2], [1, 2]] };
    case CONST.USI_KNIGHT_BLACK_PROMOTE_TYPE:
      return { just: CONST.USI_GOLD_BLACK_MOVE_DEF };
    case CONST.USI_KNIGHT_WHITE_PROMOTE_TYPE:
      return { just: CONST.USI_GOLD_WHITE_MOVE_DEF };
    }
  }
}
