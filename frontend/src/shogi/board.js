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
      const yCor = this.convertToCorY(y);
      const rows = row.map((type, x) => {
        const xCor = this.convertToCorX(x);
        return Piece.create({ type: type, x: xCor, y: yCor });
      });
      return(rows);
    });

    return _board;
  }

  movePiece(fromPiece, toPiece) {
    this.checkPieceExistence(fromPiece);
    this.checkPieceExistence(toPiece);

    if (fromPiece.is(toPiece)) {
      return this.cloneBoard().clearAttrs();
    }

    if (! this.enhanceMovablePosition(fromPiece).findPiece(toPiece).movable) {
      return this.cloneBoard().clearAttrs();
    }

    return this.movePosition(fromPiece, toPiece).clearAttrs();
  }

  movePosition(fromPiece, toPiece) {
    const newBoard = this.cloneBoard();

    const [toCorX, toCorY] = [toPiece.x, toPiece.y];
    const [toIdxX, toIdxY] = this.convertCors(toCorX, toCorY);
    const [fromCorX, fromCorY] = [fromPiece.x, fromPiece.y];
    const [fromIdxX, fromIdxY] = this.convertCors(fromCorX, fromCorY);

    fromPiece.x = toCorX;
    fromPiece.y = toCorY;

    newBoard.board[toIdxY][toIdxX] = fromPiece;
    newBoard.board[fromIdxY][fromIdxX] = new NullPiece({ x: fromCorX, y: fromCorY });

    if (this.isTakingPiece(fromPiece, toPiece)) {
      newBoard.capturedPiece = toPiece;
    }

    return newBoard;
  }

  enhanceMovablePosition(piece) {
    this.checkPieceExistence(piece);
    const moveDef = piece.moveDef();

    if (typeof moveDef === 'undefined') {
      return this;
    }

    const newBoard = this.cloneBoard();

    // if moveDef has just property, piece moves just coordinates on board.
    //
    if (moveDef.just) {
      newBoard.movablePositionsByJust(piece);
    }

    // if moveDef has fly property, piece moves recursion on board.
    //
    if (moveDef.fly) {
      newBoard.movablePositionsByFly(piece);
    }

    return newBoard;
  }

  enhanceCanDropPosition(placePiece) {
    let pawnXcors;

    if (placePiece.type === 'P' || placePiece.type === 'p') {
      pawnXcors = this.xCorsOfPiece(placePiece);
    }

    const newBoard = this.cloneBoard();
    const moveDef = placePiece.moveDef();

    newBoard.board.forEach((rows, y) => {
      rows.forEach((piece, x) => {
        if (placePiece.type === 'P' || placePiece.type === 'p') {
          // NOTE: NIFU
          if (_.includes(pawnXcors, this.convertToIndexX(x))) return;
        }

        if (placePiece.type === 'L') {
          if (y + moveDef.fly[0][1] < 0) return;
        }

        if (placePiece.type === 'l') {
          if (y + moveDef.fly[0][1] > 8) return;
        }

        if (placePiece.type === 'N' || placePiece.type === 'P') {
          if (y + moveDef.just[0][1] < 0) return;
        }

        if (placePiece.type === 'n' || placePiece.type === 'p') {
          if (y + moveDef.just[0][1] > 8) return;
        }

        if (piece.type == '*') { piece.isDrop = true; }
      });
    });

    return newBoard;
  }

  dropPiece(holdingPiece, destPiece) {
    this.checkPieceExistence(destPiece);

    const piece = this.enhanceCanDropPosition(holdingPiece).findPiece(destPiece);

    // NOTE: If destination piece is not found or does not have `isDrop` property,
    //       do nothing and return this.
    if (typeof piece === 'undefined' || !piece.isDrop) return this;

    const newBoard = this.cloneBoard();

    const [destX, destY] = [destPiece.x, destPiece.y];
    const [destXidx, destYidx] = this.convertCors(destX, destY);

    holdingPiece.x = destX;
    holdingPiece.y = destY;
    holdingPiece.dropped = true;
    newBoard.board[destYidx][destXidx] = holdingPiece;
    return newBoard.clearAttrs();
  }

  xCorsOfPiece(searchPiece) {
    const pieces = _.zip(...this.board).map((col) => {
      const piece = col.find((piece) => {
        return piece.type === searchPiece.type;
      });

      return piece ? piece.x : undefined;
    });

    return _.compact(pieces);
  }

  promotePiece(piece) {
    this.checkPieceExistence(piece);
    const newBoard = this.cloneBoard();

    newBoard.findPiece(piece).promote();

    return newBoard;
  }

  clearAttrs() {
    this.board.map((row) => {
      return row.map((piece) => {
        piece.movable = false;
        piece.isDrop = false;
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
    const isEqualPiece = this.findPiece(piece).is(
      Piece.create({
        x: piece.x,
        y: piece.y,
        type: piece.type,
        movable: piece.movable
      })
    );

    return (isUndefined || isEqualPiece);
  }

  checkPieceExistence(piece) {
    if (this.matchPiece(piece)) {
      return true;
    } else {
      const message = `type = ${piece.type}, xCor = ${piece.x}, yCor = ${piece.y}`;
      throw new Error(`Does not match coordinates in board. ${message}`);
    }
  }

  // if moveDef has just property, piece moves just coordinates on board.
  //
  movablePositionsByJust(piece) {
    const [xCor, yCor] = [piece.x, piece.y];
    const moveDef = piece.moveDef();
    const [x, y] = this.convertCors(xCor, yCor);

    moveDef.just.forEach((def) => {
      const [defX, defY] = def;
      const fetchedPiece = this.fetchPiece(x + defX, y + defY);

      if (fetchedPiece && !piece.isOwnTeam(fetchedPiece)) {
        fetchedPiece.movable = true;
      }
    });
  }

  movablePositionsByFly(piece) {
    const [xCor, yCor] = [piece.x, piece.y];
    const moveDef = piece.moveDef();
    const [x, y] = this.convertCors(xCor, yCor);

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

  convertToCorX(xIndex) {
    return 10 - xIndex - 1;
  }

  convertToCorY(yIndex) {
    return yIndex + 1;
  }

  convertToIndexX(xCor) {
    return 9 - xCor;
  }

  convertToIndexY(yCor) {
    return yCor - 1;
  }

  convertCors(xCor, yCor) {
    return [this.convertToIndexX(xCor), this.convertToIndexY(yCor)];
  }

  fetchPiece(xIndex, yIndex) {
    const row = this.board[yIndex];
    return row ? row[xIndex] : undefined;
  }

  findPiece(piece) {
    const [toCorX, toCorY] = [piece.x, piece.y];
    const [toIdxX, toIdxY] = this.convertCors(toCorX, toCorY);
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
