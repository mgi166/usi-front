import Board from '../../frontend/src/shogi/board';
import Piece from '../../frontend/src/shogi/piece';
import Turn from '../../frontend/src/shogi/turn';
import * as CONST from '../../frontend/src/shogi/constants/boardTypes';
import memo from 'memo-is';
import _ from 'lodash';

describe('isTakenKing', () => {
  context.skip("if take the piece, king is taken", () => {
    var board = memo().is(() => {
      var _board = new Board;
      _board.setBoard(position());
      return(_board);
    });

    var position = memo().is(() => {
      return (
        [
          ['*', 'p+', '*'],
          ['*', 'g', '*'],
          ['*', 'K', '*'],
        ]
      );
    });

    it('returns true', () => {
      board.isTakenKing(new Turn).should.eql(true);
    });
  });

  context.skip("if moves the piece, king is taken", () => {
  });
});

describe('#invertCor', () => {
  var board = memo().is(() => {
    var _board = new Board;
    _board.setBoard(position());
    return(_board);
  });

  var position = memo().is(() => {
    return (
      [
        ['l', 'n', 's', 'g', 'k', 'g', 's', 'n', 'l'],
        ['*', 'r', '*', '*', '*', '*', '*', 'b', '*'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
        ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
        ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['*', 'B', '*', '*', '*', '*', '*', 'R', '*'],
        ['L', 'N', 'S', 'G', 'K', 'G', 'S', 'N', 'L']
      ]
    );
  });

  it('pawn with 2, 7', () => {
    var [x, y] = board().invertCor(2, 7);
    board().board[y][x].type.should.eql('P');
    board().board[y][x].x.should.eql(2);
    board().board[y][x].y.should.eql(7);
  });

  it('* with 3, 6', () => {
    var [x, y] = board().invertCor(3, 6);
    board().board[y][x].type.should.eql('*');
    board().board[y][x].x.should.eql(3);
    board().board[y][x].y.should.eql(6);
  });
});

describe('#movePiece', () => {
  const position = memo().is(() => { return CONST.USI_INITIAL_BOARD; });

  context('once', () => {
    it('moved piece', () => {
      const board = new Board(position());
      const fromPiece = Piece.create({ type: 'P', x: 2, y: 7 });
      const toPiece = Piece.create({ type: '*', x: 2, y: 6 });

      const newBoard = board.movePiece(fromPiece, toPiece);
      newBoard.toArray().should.eql(
        [
          [ 'l', 'n', 's', 'g', 'k', 'g', 's', 'n', 'l' ],
          [ '*', 'r', '*', '*', '*', '*', '*', 'b', '*' ],
          [ 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p' ],
          [ '*', '*', '*', '*', '*', '*', '*', '*', '*' ],
          [ '*', '*', '*', '*', '*', '*', '*', '*', '*' ],
          [ '*', '*', '*', '*', '*', '*', '*', 'P', '*' ],
          [ 'P', 'P', 'P', 'P', 'P', 'P', 'P', '*', 'P' ],
          [ '*', 'B', '*', '*', '*', '*', '*', 'R', '*' ],
          [ 'L', 'N', 'S', 'G', 'K', 'G', 'S', 'N', 'L' ]
        ]
      );
    });

    // NOTE: if this.board is changed, reducer does not recognize state changing.
    //       Therefore, this.board does not change after #movePiece.
    it('does not change this.board', () => {
      const board = new Board(position());
      const fromPiece = Piece.create({ type: 'P', x: 2, y: 7 });
      const toPiece = Piece.create({ type: '*', x: 2, y: 6 });

      board.movePiece(fromPiece, toPiece);

      board.toArray().should.eql(
        [
          [ 'l', 'n', 's', 'g', 'k', 'g', 's', 'n', 'l' ],
          [ '*', 'r', '*', '*', '*', '*', '*', 'b', '*' ],
          [ 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p' ],
          [ '*', '*', '*', '*', '*', '*', '*', '*', '*' ],
          [ '*', '*', '*', '*', '*', '*', '*', '*', '*' ],
          [ '*', '*', '*', '*', '*', '*', '*', '*', '*' ],
          [ 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P' ],
          [ '*', 'B', '*', '*', '*', '*', '*', 'R', '*' ],
          [ 'L', 'N', 'S', 'G', 'K', 'G', 'S', 'N', 'L' ]
        ]
      );
    });
  });
});

describe('#checkPieceExisted', () => {
  context('the piece exists in the board', () => {
    const position = memo().is(() => {
      return [
        [ '*', 'k' ],
        [ 'P', 'p' ]
      ];
    });

    it('return true', () => {
      const board = new Board(position());
      const piece = Piece.create({ type: 'P', x: 9, y: 2 });
      board.checkPieceExisted(piece).should.be.true();
    });
  });

  context('the piece does not exist in the board', () => {
    const position = memo().is(() => {
      return [
        [ '*', 'k' ],
        [ 'P', 'p' ]
      ];
    });

    it('throw exception true', () => {
      const board = new Board(position());
      const piece = Piece.create({ type: 'k', x: 9, y: 1 });
      (() => { board.checkPieceExisted(piece); })
        .should
        .throw('Does not match coordinates in board. type = k, xCor = 9, yCor = 1');
    });
  });
});
