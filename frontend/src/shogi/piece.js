export default class Piece {
  constructor(type, x, y, movable = false) {
    this.type = type;
    this.movable = movable;
    this.x = x;
    this.y = y;
  }

  promote() {
    this.type = this.usiPromoteTypes()[this.type] || this.type;
    return this.type;
  }

  unpromote() {
    this.type = this.usiUnPromoteTypes[this.type] || this.type;
    return this.type;
  }

  usiMoveDef() {
    switch (this.type) {
    case 'p':
      return { just: [[0, 1]] };
    case 'P':
      return { just: [[0, -1]] };
    case 'l':
      return { fly: [[0, -1]] };
    case 'L':
      return { fly: [[0, 1]] };
    case 'n':
      return { just: [[-1, -2], [1, -2]] };
    case 'N':
      return { just: [[-1, 2], [1, 2]] };
    case 's':
      return { just: [[-1, -1], [-1, 0], [-1, 1], [1, -1], [1, 1]] };
    case 'S':
      return { just: [[1, -1], [1, 0], [1, 1], [-1, -1], [-1, 1]] };
    case 'g':
    case 'p+':
    case 'l+':
    case 'n+':
    case 's+':
      return { just: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, 0]] };
    case 'G':
    case 'P+':
    case 'L+':
    case 'N+':
    case 'S+':
      return { just: [[1, -1], [1, 0], [1, 1], [0, -1], [0, 1], [-1, 0]] };
    case 'r':
    case 'R':
      return { fly: [[0, -1], [0, 1], [1, 0], [-1, 0]] };
    case 'b':
    case 'B':
      return { fly: [[1, 1], [1, -1], [-1, 1], [-1, -1]] };
    case 'r+':
    case 'R+':
      return { fly: [[1, 1], [1, -1], [-1, 1], [-1, -1]], just: [[1, -1], [1, 1], [-1, 1], [-1, -1]] };
    case 'b+':
    case 'B+':
      return { fly: [[1, 1], [1, -1], [-1, 1], [-1, -1]], just: [[1, -1], [1, 1], [-1, 1], [-1, -1]] };
    case 'k':
    case 'K':
      return { just: [[1, 1], [1, 0], [1, -1], [0, 1], [0, -1], [-1, -1], [-1, 0], [-1, 1]] };
    default:
      return undefined;
    }
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
