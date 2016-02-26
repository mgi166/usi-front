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

  createBoard(board) {
    var _board = board.map((row, y) => {
      var yCor = y + 1;
      var rows = row.map((type, x) => {
        var xCor = 10 - x - 1;
        return (
          new Piece({ type: type, x: xCor, y: yCor })
        );
      });
      return(rows);
    });

    return _board;
  }

  movePiece(fromPiece, toPiece) {
    // if piece of argument is not match piece in the board, throw exception
    //
    if (! this.matchPiece(fromPiece)) {
      var pos = `xCor = ${fromPiece.x}, yCor = ${fromPiece.y}`;
      throw new Error(`Does not match coordinates in board. ${pos}`);
    }

    this.enhanceMovablePoint(fromPiece);

    var [toCorX, toCorY] = [toPiece.x, toPiece.y];
    var [toIdxX, toIdxY] = this.invertCor(toCorX, toCorY);
    var [fromCorX, fromCorY] = [fromPiece.x, fromPiece.y];
    var [fromIdxX, fromIdxY] = this.invertCor(fromCorX, fromCorY);

    var destPiece = this.board[toIdxY][toIdxX];

    if (typeof destPiece === 'undefined' || ! destPiece.movable) {
      return;
    }

    fromPiece.x = destPiece.x;
    fromPiece.y = destPiece.y;

    this.board[toIdxY][toIdxX] = fromPiece;
    this.board[fromIdxY][fromIdxX].type = '*';

    return;
  }

  enhanceMovablePoint(piece) {
    var [xCor, yCor] = [piece.x, piece.y];
    var moveDef = piece.moveDef();

    // if piece of argument is not match piece in the board, throw exception
    //
    if (! this.matchPiece(piece)) {
      var pos = `xCor = ${xCor}, yCor = ${yCor}`;
      throw new Error(`Does not match coordinates in board. ${pos}`);
    }

    // if moveDef has just property, piece moves just coordinates on board.
    //
    if (moveDef.just) {
      this.movablePointsByJust(piece);
    }

    // if moveDef has fly property, piece moves recursion on board.
    //
    if (moveDef.fly) {
      this.movablePointsByFly(piece);
    }
  }

  // if piece of argument is match in the board, return true, else return false
  //
  matchPiece(piece) {
    var [xCor, yCor] = [piece.x, piece.y];
    var [x, y] = this.invertCor(xCor, yCor);

    var isUndefined = typeof this.findPiece(x, y) === 'undefined';
    var isEqualPiece = this.findPiece(x, y).equals(
      new Piece({
        x: piece.x,
        y: piece.y,
        type: piece.type,
        movable: piece.movable
      })
    );

    return (isUndefined || isEqualPiece);
  }

  // if moveDef has just property, piece moves just coordinates on board.
  //
  movablePointsByJust(piece) {
    var [xCor, yCor] = [piece.x, piece.y];
    var moveDef = piece.moveDef();
    var [x, y] = this.invertCor(xCor, yCor);

    moveDef.just.forEach((def) => {
      var [defX, defY] = def;
      var piece = this.findPiece(x + defX, y + defY);
      if (piece) { piece.movable = true; }
    });
  }

  movablePointsByFly(piece) {
    var [xCor, yCor] = [piece.x, piece.y];
    var moveDef = piece.moveDef();
    var [x, y] = this.invertCor(xCor, yCor);

    moveDef.fly.forEach((def) => {
      var [defX, defY] = def;
      var dx, dy;

      dx = x + defX;
      dy = y + defY;

      var piece = this.findPiece(dx, dy);

      while (piece) {
        piece.movable = true;
        dx = dx + defX;
        dy = dy + defY;

        piece = this.findPiece(dx, dy);

        if (piece && piece.type !== '*') {
          piece.movable = true;
          break;
        }
      }
    });
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

  findPiece(xIndex, yIndex) {
    var row = this.board[yIndex];
    return row ? row[xIndex] : undefined;
  }

  toArray() {
    return this.board.map((row) => {
      return row.map((piece) => {
        return piece.type;
      });
    });
  }

  // transposeToCorX(xIndex) {
  // }

  // transposeToCorY(xIndex) {
  // }
};
