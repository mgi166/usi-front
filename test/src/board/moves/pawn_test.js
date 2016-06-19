import Board from '../../../../frontend/src/shogi/board';
import Piece from '../../../../frontend/src/shogi/piece';
import memo from 'memo-is';
import _ from 'lodash';

describe('#enhanceMovablePoint', () => {
  describe('black', () => {
    context('match the piece to coordinate', () => {
      context('exists movable coordinates', () => {
        const position = memo().is(() => {
          return (
            [
              ['*', '*', '*'],
              ['*', 'P', '*']
            ]
          );
        });

        it('change property of piece that is moved', () => {
          const board = new Board(position());
          const piece = Piece.create({ type: 'P', x: 8, y: 2 });

          const movablePieces = board.enhanceMovablePoint(piece).board.map((row) => {
            return (
              row.filter((cell) => { return(cell.movable); })
            );
          });

          _.flattenDeep(movablePieces).should.eql(
            [Piece.create({ type: '*', x: 8, y: 1, movable: true })]
          );
        });
      });

      context('does not exist movable coordinates', () => {
        const position = memo().is(() => {
          return (
            [
              ['P', '*', '*'],
              ['*', '*', '*']
            ]
          );
        });

        it('does not change property of piece', () => {
          const board = new Board(position());
          const piece = Piece.create({ type: 'P', x: 9, y: 1 });

          const movablePieces = board.enhanceMovablePoint(piece).board.map((row) => {
            return (
              row.filter((cell) => { return(cell.movable); })
            );
          });

          _.flattenDeep(movablePieces).should.eql([]);
        });
      });
    });

    context('mismatch the piece to coordinate', () => {
      const position = memo().is(() => {
        return (
          [
            ['*', '*', '*'],
            ['*', '*', 'P']
          ]
        );
      });

      it('throw exception', () => {
        const board = new Board(position());
        const piece = Piece.create({ type: 'P', x: 8, y: 2 });

        (() => { return board.enhanceMovablePoint(piece); }).should.throw();;
      });
    });

    context.skip('if move piece, king is taken', () => {
    });
  });

  describe('white', () => {
    context('match the piece to coordinate', () => {
      context('exists movable coordinates', () => {
        const position = memo().is(() => {
          return (
            [
              ['*', 'p', '*'],
              ['*', '*', '*']
            ]
          );
        });

        it('change property of piece that is moved', () => {
          const board = new Board(position());
          const piece = Piece.create({ type: 'p', x: 8, y: 1 });

          const movablePieces = board.enhanceMovablePoint(piece).board.map((row) => {
            return (
              row.filter((cell) => { return(cell.movable); })
            );
          });

          _.flattenDeep(movablePieces).should.eql(
            [Piece.create({ type: '*', x: 8, y: 2, movable: true })]
          );
        });
      });

      context('does not exist movable coordinates', () => {
        const position = memo().is(() => {
          return (
            [
              ['*', '*', '*'],
              ['p', '*', '*']
            ]
          );
        });

        it('does not change property of piece', () => {
          const board = new Board(position());
          const piece = Piece.create({ type: 'p', x: 9, y: 2 });

          const movablePieces = board.enhanceMovablePoint(piece).board.map((row) => {
            return (
              row.filter((cell) => { return(cell.movable); })
            );
          });

          _.flattenDeep(movablePieces).should.eql([]);
        });
      });
    });

    context('mismatch the piece to coordinate', () => {
      const position = memo().is(() => {
        return (
          [
            ['*', '*', 'p'],
            ['*', '*', '*']
          ]
        );
      });

      it('throw exception', () => {
        const board = new Board(position());
        const piece = Piece.create({ type: 'p', x: 9, y: 1 });

        (() => { return board.enhanceMovablePoint(piece); }).should.throw();;
      });
    });

    context.skip('if move piece, king is taken', () => {
    });
  });
});

describe('#movePiece', () => {
  context('match piece of first argument and piece in the board', () => {
    context('destination has movable property', () => {
      context.skip('promote', () => {
      });

      context('no promote', () => {
        const position = memo().is(() => {
          return (
            [
              ['*', '*', '*'],
              ['*', 'P', '*'],
              ['*', '*', '*']
            ]
          );
        });

        it('moves piece', () => {
          const board = new Board(position());
          const fromPiece = Piece.create({ type: 'P', x: 8, y: 2 });
          const toPiece = Piece.create({ type: '*', x: 8, y: 1 });

          board.movePiece(fromPiece, toPiece).toArray().should.eql(
            [
              ['*', 'P', '*'],
              ['*', '*', '*'],
              ['*', '*', '*']
            ]
          );
        });
      });
    });

    context('destination does not have movable property', () => {
      const position = memo().is(() => {
        return (
          [
            ['*', '*', '*'],
            ['*', 'P', '*'],
            ['*', '*', '*']
          ]
        );
      });

      it('does not move piece', () => {
        const board = new Board(position());
        const fromPiece = Piece.create({ type: 'P', x: 8, y: 2 });
        const toPiece = Piece.create({ type: '*', x: 8, y: 3 });

        board.movePiece(fromPiece, toPiece).toArray().should.eql(
          [
            ['*', '*', '*'],
            ['*', 'P', '*'],
            ['*', '*', '*']
          ]
        );
      });
    });
  });

  context('mismatch piece of first argument and piece in the board', () => {
    const position = memo().is(() => {
      return (
        [
          ['*', '*', '*'],
          ['*', 'P', '*'],
          ['*', '*', '*']
        ]
      );
    });

    it('throw exception', () => {
      const board = new Board(position());
      const fromPiece = Piece.create({ type: 'P', x: 8, y: 3 });
      const toPiece = Piece.create({ type: '*', x: 8, y: 1 });

      (() => { board.movePiece(fromPiece, toPiece); }).should.throw();
    });
  });
});
