import Piece from './piece';
import { NullPiece } from './pieces/index';
import _ from 'lodash';
import * as CONST from './constants/boardTypes';

export default class Board {
  constructor(board = undefined) {
    board ? this.setBoard(board) : this.setBoard(CONST.USI_INITIAL_BOARD);
  }

  setBoard(board) {
    this.board = this.createBoard(board);
  }

  createBoard(board) {
    const _board = board.map((row, y) => {
      const yCor = this.transposeToCorY(y);
      const rows = row.map((type, x) => {
        const xCor = this.transposeToCorX(x);
        return Piece.create({ type: type, x: xCor, y: yCor });
      });
      return(rows);
    });

    return _board;
  }

  movePiece(fromPiece, toPiece) {
    this.checkPieceExisted(fromPiece);
    this.checkPieceExisted(toPiece);

    if (fromPiece.equals(toPiece)) {
      return this.cloneBoard().clearAttrs();
    }

    if (! this.enhanceMovablePoint(fromPiece).findPiece(toPiece).movable) {
      return this.cloneBoard().clearAttrs();
    }

    return this.movePosition(fromPiece, toPiece).clearAttrs();
  }

  movePosition(fromPiece, toPiece) {
    const newBoard = this.cloneBoard();

    const [toCorX, toCorY] = [toPiece.x, toPiece.y];
    const [toIdxX, toIdxY] = this.invertCor(toCorX, toCorY);
    const [fromCorX, fromCorY] = [fromPiece.x, fromPiece.y];
    const [fromIdxX, fromIdxY] = this.invertCor(fromCorX, fromCorY);

    fromPiece.x = toCorX;
    fromPiece.y = toCorY;

    newBoard.board[toIdxY][toIdxX] = fromPiece;
    newBoard.board[fromIdxY][fromIdxX] = new NullPiece({ x: fromCorX, y: fromCorY });

    if (this.isTakingPiece(fromPiece, toPiece)) {
      newBoard.capturedPiece = toPiece;
    }

    return newBoard;
  }

  enhancePlaceablePoint(placePiece) {
    let pawnXcors;

    if (placePiece.type === 'P' || placePiece.type === 'p') {
      pawnXcors = this.indexXOfPiece(placePiece);
    }

    this.board.forEach((rows, y) => {
      rows.forEach((piece, x) => {
        const moveDef = placePiece.moveDef();

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

  indexXOfPiece(searchPiece) {
    const pieces = this.board.map((rows) => {
      return rows.map((piece, x) => {
        return piece.type === searchPiece.type ? x : undefined;
      });
    });

    return _.chain(pieces).flattenDeep().compact().uniq().value();
  }

  enhanceMovablePoint(piece) {
    this.checkPieceExisted(piece);
    const moveDef = piece.moveDef();

    if (typeof moveDef === 'undefined') {
      return this;
    }

    const newBoard = this.cloneBoard();

    // if moveDef has just property, piece moves just coordinates on board.
    //
    if (moveDef.just) {
      newBoard.movablePointsByJust(piece);
    }

    // if moveDef has fly property, piece moves recursion on board.
    //
    if (moveDef.fly) {
      newBoard.movablePointsByFly(piece);
    }

    return newBoard;
  }

  promotePiece(piece) {
    this.checkPieceExisted(piece);
    const newBoard = this.cloneBoard();

    newBoard.findPiece(piece).promote();

    return newBoard;
  }

  clearAttrs() {
    this.board.map((row) => {
      return row.map((piece) => {
        piece.movable = false;
        piece.isPlaced = false;
      });
    });

    return this;
  }

  // NOTE: No check the piece existance. because this method is used private method.
  isTakingPiece(fromPiece, toPiece) {
    if (typeof fromPiece.team() === 'undefined') { return false; }
    if (typeof toPiece.team() === 'undefined') { return false; }

    return fromPiece.team() !== toPiece.team();
  }

  // if piece of argument is match in the board, return true, else return false
  //
  matchPiece(piece) {
    const isUndefined = typeof this.findPiece(piece) === 'undefined';
    const isEqualPiece = this.findPiece(piece).equals(
      Piece.create({
        x: piece.x,
        y: piece.y,
        type: piece.type,
        movable: piece.movable
      })
    );

    return (isUndefined || isEqualPiece);
  }

  checkPieceExisted(piece) {
    if (this.matchPiece(piece)) {
      return true;
    } else {
      const message = `type = ${piece.type}, xCor = ${piece.x}, yCor = ${piece.y}`;
      throw new Error(`Does not match coordinates in board. ${message}`);
    }
  }

  // if moveDef has just property, piece moves just coordinates on board.
  //
  movablePointsByJust(piece) {
    const [xCor, yCor] = [piece.x, piece.y];
    const moveDef = piece.moveDef();
    const [x, y] = this.invertCor(xCor, yCor);

    moveDef.just.forEach((def) => {
      const [defX, defY] = def;
      const fetchedPiece = this.fetchPiece(x + defX, y + defY);

      if (fetchedPiece && !piece.isOwnTeam(fetchedPiece)) {
        fetchedPiece.movable = true;
      }
    });
  }

  movablePointsByFly(piece) {
    const [xCor, yCor] = [piece.x, piece.y];
    const moveDef = piece.moveDef();
    const [x, y] = this.invertCor(xCor, yCor);

    moveDef.fly.forEach((def) => {
      const [defX, defY] = def;

      let dx = x + defX;
      let dy = y + defY;
      let fetchedPiece = this.fetchPiece(dx, dy);

      while (fetchedPiece) {
        if (fetchedPiece.type === '*') {
          fetchedPiece.movable = true;
        } else if (piece.isOwnTeam(fetchedPiece)) {
          break;
        } else {
          fetchedPiece.movable = true;
          break;
        }

        dx = dx + defX;
        dy = dy + defY;

        fetchedPiece = this.fetchPiece(dx, dy);
      }
    });
  }

  cloneBoard() {
    const dupBoard = _.cloneDeep(this.board);
    const newBoard = new Board;
    newBoard.board = dupBoard;
    return newBoard;
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
    const row = this.board[yIndex];
    return row ? row[xIndex] : undefined;
  }

  findPiece(piece) {
    const [toCorX, toCorY] = [piece.x, piece.y];
    const [toIdxX, toIdxY] = this.invertCor(toCorX, toCorY);
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
