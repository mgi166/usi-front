import Piece from './piece';
import { NullPiece } from './pieces/index';
import _ from 'lodash';
import * as CONST from './constants/boardTypes';

export default class Board {
  constructor(board = undefined) {
    if (board) {
      this.board = board;
    } else {
      this.setBoard(CONST.USI_INITIAL_BOARD);
    }
  }

  setBoard(board) {
    this.board = this.createBoard(board);
  }

  createBoard(board) {
    var _board = board.map((row, y) => {
      var yCor = this.transposeToCorY(y);
      var rows = row.map((type, x) => {
        var xCor = this.transposeToCorX(x);
        return (
          Piece.create({ type: type, x: xCor, y: yCor })
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
      var pos = `type = ${fromPiece.type}, xCor = ${fromPiece.x}, yCor = ${fromPiece.y}`;
      throw new Error(`Does not match coordinates in board. ${pos}`);
    }

    if (! this.matchPiece(toPiece)) {
      var pos = `type = ${toPiece.type}, xCor = ${toPiece.x}, yCor = ${toPiece.y}`;
      throw new Error(`Does not match coordinates in board. ${pos}`);
    }

    var _board = _.cloneDeep(this.board);

    this.enhanceMovablePoint(fromPiece);

    var [toCorX, toCorY] = [toPiece.x, toPiece.y];
    var [toIdxX, toIdxY] = this.invertCor(toCorX, toCorY);
    var [fromCorX, fromCorY] = [fromPiece.x, fromPiece.y];
    var [fromIdxX, fromIdxY] = this.invertCor(fromCorX, fromCorY);

    var destPiece = this.board[toIdxY][toIdxX];

    if (typeof destPiece === 'undefined' || ! destPiece.movable) {
      return _board;
    }

    fromPiece.x = toCorX;
    fromPiece.y = toCorY;

    _board[toIdxY][toIdxX] = fromPiece;
    _board[fromIdxY][fromIdxX] = new NullPiece({ x: fromCorX, y: fromCorY});

    return _board;
  }

  enhancePlaceablePoint(placePiece) {
    if (placePiece.type === 'P' || placePiece.type === 'p') {
      var pawnXcors = this.IndexXOfPiece(placePiece);
    }

    this.board.forEach((rows, y) => {
      rows.forEach((piece, x) => {
        var moveDef = placePiece.moveDef();

        if (placePiece.type === 'P') {
          // NOTE: Does not move, if placed a piece in this point.
          if (y + moveDef.just[0][1] < 0) { return; }

          // NOTE: NIFU
          if (_.includes(pawnXcors, x)) { return; }
        }

        if (placePiece.type === 'p') {
          // NOTE: Does not move, if placed a piece in this point.
          if (y + moveDef.just[0][1] > 8) { return; }
          if (_.includes(pawnXcors, x)) { return; }
        }

        if (placePiece.type === 'L') {
          if (y + moveDef.fly[0][1] < 0) { return; }
        }

        if (placePiece.type === 'l') {
          if (y + moveDef.fly[0][1] > 8) { return; }
        }

        if (placePiece.type === 'N') {
          if (y + moveDef.just[0][1] < 0) { return; }
        }

        if (placePiece.type === 'n') {
          if (y + moveDef.just[0][1] > 8) { return; }
        }

        if (piece.type == '*') { piece.isPlaced = true; }
      });
    });
  }

  IndexXOfPiece(searchPiece) {
    var pieces = this.board.map((rows) => {
      return rows.map((piece, x) => {
        return piece.type === searchPiece.type ? x : undefined;
      });
    });

    return _.chain(pieces).flattenDeep().compact().uniq().value();
  }

  enhanceMovablePoint(piece) {
    var moveDef = piece.moveDef();

    // if piece of argument is not match piece in the board, throw exception
    //
    if (! this.matchPiece(piece)) {
      var pos = `type = ${piece.type}, xCor = ${piece.x}, yCor = ${piece.y}`;
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
    var isUndefined = typeof this.findPiece(piece) === 'undefined';
    var isEqualPiece = this.findPiece(piece).equals(
      Piece.create({
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
      var fetchPiece = this.fetchPiece(x + defX, y + defY);

      if (fetchPiece && !piece.isOwnTeam(fetchPiece)) {
        fetchPiece.movable = true;
      }
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

      var fetchPiece = this.fetchPiece(dx, dy);

      while (fetchPiece) {
        if (fetchPiece.type === '*') {
          fetchPiece.movable = true;
        } else if (piece.isOwnTeam(fetchPiece)) {
          break;
        } else {
          fetchPiece.movable = true;
          break;
        }

        dx = dx + defX;
        dy = dy + defY;

        fetchPiece = this.fetchPiece(dx, dy);
      }
    });
  }

  transposeToCorX(xIndex) {
    return 10 - xIndex - 1;
  }

  transposeToCorY(yIndex) {
    return yIndex + 1;
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

  fetchPiece(xIndex, yIndex) {
    var row = this.board[yIndex];
    return row ? row[xIndex] : undefined;
  }

  findPiece(piece) {
    var [toCorX, toCorY] = [piece.x, piece.y];
    var [toIdxX, toIdxY] = this.invertCor(toCorX, toCorY);
    return this.fetchPiece(toIdxX, toIdxY);
  }

  toArray() {
    return this.board.map((row) => {
      return row.map((piece) => {
        return piece.type;
      });
    });
  }
};
