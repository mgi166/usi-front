import Piece from './piece';

export default class Board {
  constructor() {
    this.setBoard(this.initialUsiBoard());
  }

  initialUsiBoard() {
    return (
      [
        ['l', 'n', 's', 'g', 'k', 'g', 's', 'n', 'l'],
        ['*', 'b', '*', '*', '*', '*', '*', 'r', '*'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
        ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
        ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['*', 'B', '*', '*', '*', '*', '*', 'R', '*'],
        ['L', 'N', 'S', 'G', 'K', 'G', 'S', 'N', 'L']
      ]
    );
  }

  setBoard(board) {
    this.board = this.createBoard(board);
  }

  createBoard() {
    var _board = this.initialUsiBoard().map((row, y) => {
      var yCor = y + 1;
      var rows = row.map((type, x) => {
        var xCor = 10 - x - 1;
        return (
          new Piece(type, xCor, yCor)
        );
      });
      return(rows);
    });

    return _board;
  }

  enhanceMovablePoint(piece) {
    var [xCor, yCor] = [piece.x, piece.y];
    var moveDef = piece.moveDef();
    var [x, y] = this.invertCor(xCor, yCor);

    if (moveDef.just) {
      moveDef.just.forEach((def) => {
        var [defX, defY] = def;
        this.board[y + defY][x + defX].movable = true;
        console.log(this.board[y + defY][x + defX]);
      });
    }
  }

  invertToIndexX(xCor) {
    return 9 - xCor;
  }

  invertToIndexY(yCor) {
    return yCor - 1;
  }

  invertCor(xCor, yCor) {
    return [this.invertToIndexX(xCor), this.invertToIndexY(yCor)];
  }

  // transposeToCorX(xIndex) {
  // }

  // transposeToCorY(xIndex) {
  // }
};
