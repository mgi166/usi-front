import Base from './base';
import * as CONST from '../constants/pieceTypes';

export default class King extends Base {
  constructor({ type, x, y, movable, isDrop, dropped }) {
    super({ type, x, y, movable, isDrop, dropped });

    if (this.type !== CONST.USI_KING_BLACK_TYPE &&
        this.type !== CONST.USI_KING_WHITE_TYPE) {
      throw new Error(`Unexpected type as King: type is ${this.type}`);
    }

    return this;
  }

  promote() {
    // NOTE: Do nothing. because King can't promote.
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
    throw new Error.new('If King is captured, Gameover!');
  }

  moveDef() {
    return { just: [[1, 1], [1, 0], [1, -1], [0, 1], [0, -1], [-1, -1], [-1, 0], [-1, 1]] };
  }
}
