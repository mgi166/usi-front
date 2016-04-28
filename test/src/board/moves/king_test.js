import Board from '../../../../frontend/src/shogi/board';
import Piece from '../../../../frontend/src/shogi/piece';
import memo from 'memo-is';
import _ from 'lodash';

describe('#enhanceMovablePoint', () => {
  describe('black', () => {
    var board = memo().is(() => {
      var _board = new Board;
      _board.setBoard(position());
      return(_board);
    });

    var position = memo().is(() => {
      return (
        [
          ['*', 'p', '*'],
          ['*', 'K', '*'],
          ['P', '*', '*'],
          ['*', '*', '*'],
        ]
      );
    });

    context('normal case', () => {
      it('change property of piece is movable', () => {
        var piece = Piece.create({ type: 'K', x: 8, y: 2 });

        board().enhanceMovablePoint(piece);

        var movablePieces = board().board.map((row) => {
          return (
            row.filter((cell) => { return(cell.movable); })
          );
        });

        _.flattenDeep(movablePieces).should.eql(
          [
            Piece.create({ type: '*', x: 9, y: 1, movable: true }),
            Piece.create({ type: 'p', x: 8, y: 1, movable: true }),
            Piece.create({ type: '*', x: 7, y: 1, movable: true }),
            Piece.create({ type: '*', x: 9, y: 2, movable: true }),
            Piece.create({ type: '*', x: 7, y: 2, movable: true }),
            Piece.create({ type: '*', x: 8, y: 3, movable: true }),
            Piece.create({ type: '*', x: 7, y: 3, movable: true }),
          ]
        );
      });
    });

    context.skip('if moves the piece, king is taken', () => {
    });

    context.skip('if take the piece, king is taken', () => {
    });
  });

  describe('white', () => {
  });
});

describe('#movePiece', () => {
  context('mismatch piece of first argument and piece in the board', () => {
    const position = memo().is(() => {
      return (
        [
          ['*', '*', '*'],
          ['*', '*', '*'],
          ['*', '*', '*'],
          ['R', '*', '*'],
          ['*', 'K', '*'],
        ]
      );
    });

    it('throw exception', () => {
      const board = new Board(position());
      const fromPiece = Piece.create({type: 'K', x: 8, y: 3});
      const toPiece = Piece.create({type: '*', x: 7, y: 4});
      (() => board.movePiece(fromPiece, toPiece)).should.throw();
    });
  });

  context('mismatch piece of second argument and piece in the board', () => {
    const position = memo().is(() => {
      return (
        [
          ['*', '*', '*'],
          ['*', '*', '*'],
          ['*', '*', '*'],
          ['R', '*', '*'],
          ['*', 'K', '*'],
        ]
      );
    });

    it('throw exception', () => {
      const board = new Board(position());
      const fromPiece = Piece.create({type: 'K', x: 8, y: 5});
      const toPiece = Piece.create({type: 'R', x: 7, y: 4});
      (() => board.movePiece(fromPiece, toPiece)).should.throw();
    });
  });

  context('black', () => {
    context('toPiece is movable', () => {
      const position = memo().is(() => {
        return (
          [
            ['*', '*', '*'],
            ['*', '*', '*'],
            ['*', '*', '*'],
            ['R', '*', '*'],
            ['*', 'K', '*'],
          ]
        );
      });

      it('moves board', () => {
        const board = new Board(position());
        const fromPiece = Piece.create({type: 'K', x: 8, y: 5});
        const toPiece = Piece.create({type: '*', x: 7, y: 4});

        board.movePiece(fromPiece, toPiece).toArray().should.eql(
          [
            ['*', '*', '*'],
            ['*', '*', '*'],
            ['*', '*', '*'],
            ['R', '*', 'K'],
            ['*', '*', '*'],
          ]
        );
      });
    });

    context('toPiece is not movable', () => {
      const position = memo().is(() => {
        return (
          [
            ['*', '*', '*'],
            ['*', '*', '*'],
            ['*', '*', '*'],
            ['R', '*', '*'],
            ['*', 'K', '*'],
          ]
        );
      });

      it('does not move board', () => {
        const board = new Board(position());
        const fromPiece = Piece.create({type: 'K', x: 8, y: 5});
        const toPiece = Piece.create({type: 'R', x: 9, y: 4});

        board.movePiece(fromPiece, toPiece).toArray().should.eql(
          [
            ['*', '*', '*'],
            ['*', '*', '*'],
            ['*', '*', '*'],
            ['R', '*', '*'],
            ['*', 'K', '*'],
          ]
        );
      });
    });
  });

  context('white', () => {
    context('toPiece is movable', () => {
      const position = memo().is(() => {
        return (
          [
            ['*', '*', '*'],
            ['*', 'k', '*'],
            ['p', '*', '*'],
            ['*', '*', '*'],
            ['*', '*', '*'],
          ]
        );
      });

      it('moves board', () => {
        const board = new Board(position());
        const fromPiece = Piece.create({type: 'k', x: 8, y: 2});
        const toPiece = Piece.create({type: '*', x: 7, y: 3});

        board.movePiece(fromPiece, toPiece).toArray().should.eql(
          [
            ['*', '*', '*'],
            ['*', '*', '*'],
            ['p', '*', 'k'],
            ['*', '*', '*'],
            ['*', '*', '*'],
          ]
        );
      });
    });

    context('toPiece is not movable', () => {
      const position = memo().is(() => {
        return (
          [
            ['*', '*', '*'],
            ['*', 'k', '*'],
            ['p', '*', '*'],
            ['*', '*', '*'],
            ['*', '*', '*'],
          ]
        );
      });

      it('moves board', () => {
        const board = new Board(position());
        const fromPiece = Piece.create({type: 'k', x: 8, y: 2});
        const toPiece = Piece.create({type: 'p', x: 9, y: 3});

        board.movePiece(fromPiece, toPiece).toArray().should.eql(
          [
            ['*', '*', '*'],
            ['*', 'k', '*'],
            ['p', '*', '*'],
            ['*', '*', '*'],
            ['*', '*', '*'],
          ]
        );
      });
    });
  });
});
