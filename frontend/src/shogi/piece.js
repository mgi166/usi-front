import Shogi from '../shogi';

Shogi.Piece = class Piece {
  constructor(type, x, y) {
    this.type = type;
    this.x = x;
    this.y = y;
  }

  promote() {
    this.type = this.usiPromoteTypes(this.type) || this.type;
    return this.type;
  }

  unpromote() {
    this.type = this.usiUnPromoteTypes(this.type) || this.type;
    return this.type;
  }

  usiPromoteTypes() {
    return {
      p: 'p+',
      l: 'l+',
      n: 'n+',
      s: 's+',
      b: 'b+',
      r: 'r+',
      P: 'P+',
      L: 'L+',
      N: 'N+',
      S: 'S+',
      B: 'B+',
      R: 'R+'
    };
  }

  usiUnPromoteTypes() {
    return {
      'p+': 'p',
      'l+': 'l',
      'n+': 'n',
      's+': 's',
      'b+': 'b',
      'r+': 'r',
      'P+': 'P',
      'L+': 'L',
      'N+': 'N',
      'S+': 'S',
      'B+': 'B',
      'R+': 'R'
    };
  }
};
