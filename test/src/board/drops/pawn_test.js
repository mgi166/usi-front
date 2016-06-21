import Board from '../../../../frontend/src/shogi/board';
import Piece from '../../../../frontend/src/shogi/piece';
import memo from 'memo-is';
import _ from 'lodash';

describe('Pawn', () => {
  describe('#enhanceCanDropPosition', () => {
    describe('black', () => {
      context('the normal pattern', () => {
        const position = memo().is(() => {
          return (
            [
              ['*', '*', '*'],
              ['P', '*', 'p'],
              ['*', '*', '*'],
              ['*', '*', '*']
            ]
          );
        });

        it('change property of piece that is placeable', () => {
          const board = new Board(position());
          const piece = Piece.create({ type: 'P', x: 0, y: 0 });

          const enhancedPositions = board.enhanceCanDropPosition(piece).board.map((row) => {
            return (
              row.filter((cell) => { return(cell.isDrop); })
            );
          });

          _.flattenDeep(enhancedPositions).should.eql(
            [
              Piece.create({ type: '*', x: 8, y: 2, isDrop: true}),
              Piece.create({ type: '*', x: 8, y: 3, isDrop: true}),
              Piece.create({ type: '*', x: 7, y: 3, isDrop: true}),
              Piece.create({ type: '*', x: 8, y: 4, isDrop: true}),
              Piece.create({ type: '*', x: 7, y: 4, isDrop: true}),
            ]
          );
        });
      });

      context.skip('`UCHI FU ZUME`', () => {
      });
    });

    describe('white', () => {
      context('the normal pattern', () => {
        const position = memo().is(() => {
          return (
            [
              ['*', '*'],
              ['*', '*'],
              ['*', '*'],
              ['*', '*'],
              ['*', '*'],
              ['*', 'p'],
              ['b', '*'],
              ['*', '*'],
              ['*', '*'],
            ]
          );
        });

        it('change property of piece that is placeable', () => {
          const board = new Board(position());
          const piece = Piece.create({ type: 'p', x: 0, y: 0 });

          const enhancedPositions = board.enhanceCanDropPosition(piece).board.map((row) => {
            return (
              row.filter((cell) => { return(cell.isDrop); })
            );
          });

          _.flattenDeep(enhancedPositions).should.eql(
            [
              Piece.create({ type: '*', x: 9, y: 1, isDrop: true}),
              Piece.create({ type: '*', x: 9, y: 2, isDrop: true}),
              Piece.create({ type: '*', x: 9, y: 3, isDrop: true}),
              Piece.create({ type: '*', x: 9, y: 4, isDrop: true}),
              Piece.create({ type: '*', x: 9, y: 5, isDrop: true}),
              Piece.create({ type: '*', x: 9, y: 6, isDrop: true}),
              Piece.create({ type: '*', x: 9, y: 8, isDrop: true}),
            ]
          );
        });
      });

      context.skip('`UCHI FU ZUME`', () => {
      });
    });
  });

  describe('#dropPiece', () => {
    context('black', () => {
      const position = memo().is(() => {
        return [
          ['*', '*', '*'],
          ['P', '*', 'p'],
          ['*', '*', '*'],
        ];
      });

      context('when specify the piece that destination is able to drop', () => {
        it('drop holding piece to destination piece', () => {
          const board = new Board(position());

          const holdingPiece = Piece.create({ type: 'P' });
          const destPiece = Piece.create({ type: '*', x: 8, y: 2 });

          board.dropPiece(holdingPiece, destPiece).toArray().should.eql(
            [
              ['*', '*', '*'],
              ['P', 'P', 'p'],
              ['*', '*', '*'],
            ]
          );
        });
      });

      context('when specify the piece that destination is not able to drop', () => {
        it('do nothing', () => {
          const board = new Board(position());

          const holdingPiece = Piece.create({ type: 'P' });
          const destPiece = Piece.create({ type: '*', x: 9, y: 3 });

          board.dropPiece(holdingPiece, destPiece).toArray().should.eql(
            [
              ['*', '*', '*'],
              ['P', '*', 'p'],
              ['*', '*', '*'],
            ]
          );
        });
      });

      context('when specify the piece that does not found', () => {
        it('throw error', () => {
          const board = new Board(position());

          const holdingPiece = Piece.create({ type: 'P' });
          const destPiece = Piece.create({ type: 'G', x: 7, y: 3 });

          (() => { board.dropPiece(holdingPiece, destPiece); }).should.throw();
        });
      });
    });
  });
});
