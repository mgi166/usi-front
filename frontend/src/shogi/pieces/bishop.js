import Piece from '../piece';
import * as CONST from '../constants/pieceTypes';

export default class Bishop extends Piece {
  constructor({ type, x, y, movable = false, isPlaced =  false }) {
    super({ type, x, y, movable, isPlaced });

    if (this.type !== CONST.USI_BISHOP_BLACK_TYPE &&
        this.type !== CONST.USI_BISHOP_WHITE_TYPE &&
        this.type !== CONST.USI_BISHOP_BLACK_PROMOTE_TYPE &&
        this.type !== CONST.USI_BISHOP_WHITE_PROMOTE_TYPE) {
      throw new Error(`Unexpected type as Bishop: type is ${this.type}`);
    }

    return this;
  }

  promote() {
    switch (this.type) {
    case CONST.USI_BISHOP_BLACK_TYPE:
      return this.type = CONST.USI_BISHOP_BLACK_PROMOTE_TYPE;
    case CONST.USI_BISHOP_WHITE_TYPE:
      return this.type = CONST.USI_BISHOP_WHITE_PROMOTE_TYPE;
    };
    return this;
  }

  unpromote() {
    switch (this.type) {
    case CONST.USI_BISHOP_BLACK_PROMOTE_TYPE:
      return this.type = CONST.USI_BISHOP_BLACK_TYPE;
    case CONST.USI_BISHOP_WHITE_PROMOTE_TYPE:
      return this.type = CONST.USI_BISHOP_WHITE_TYPE;
    };
    return this;
  }

  isPromoted() {
    switch (this.type) {
    case CONST.USI_BISHOP_BLACK_PROMOTE_TYPE:
      return true;
    case CONST.USI_BISHOP_WHITE_PROMOTE_TYPE:
      return true;
    default:
      return false;
    }
  }

  moveDef() {
    switch (this.isPromoted()) {
    case true:
      return {
        fly: [
          [1, 1],
          [1, -1],
          [-1, 1],
          [-1, -1]
        ],
        just: [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1]
        ]
      };
    default:
      return {
        fly: [
          [1, 1],
          [1, -1],
          [-1, 1],
          [-1, -1]
        ]
      };
    }
  }
}