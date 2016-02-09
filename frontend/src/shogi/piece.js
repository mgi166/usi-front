import Shogi from '../shogi';

Shogi.Piece = class Piece {
  constructor(type, x, y) {
    this.type = type;
    this.x = x;
    this.y = y;
  }
};
