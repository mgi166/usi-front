import Board from '../../../../frontend/src/shogi/board';
import Piece from '../../../../frontend/src/shogi/piece';
import memo from 'memo-is';
import _ from 'lodash';

describe('Pawn', () => {
  describe('#enhancePlaceablePoint', () => {
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

          const placeablePieces = board.enhancePlaceablePoint(piece).board.map((row) => {
            return (
              row.filter((cell) => { return(cell.isPlaced); })
            );
          });

          _.flattenDeep(placeablePieces).should.eql(
            [
              Piece.create({ type: '*', x: 8, y: 2, isPlaced: true}),
              Piece.create({ type: '*', x: 8, y: 3, isPlaced: true}),
              Piece.create({ type: '*', x: 7, y: 3, isPlaced: true}),
              Piece.create({ type: '*', x: 8, y: 4, isPlaced: true}),
              Piece.create({ type: '*', x: 7, y: 4, isPlaced: true}),
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

          const placeablePieces = board.enhancePlaceablePoint(piece).board.map((row) => {
            return (
              row.filter((cell) => { return(cell.isPlaced); })
            );
          });

          _.flattenDeep(placeablePieces).should.eql(
            [
              Piece.create({ type: '*', x: 9, y: 1, isPlaced: true}),
              Piece.create({ type: '*', x: 9, y: 2, isPlaced: true}),
              Piece.create({ type: '*', x: 9, y: 3, isPlaced: true}),
              Piece.create({ type: '*', x: 9, y: 4, isPlaced: true}),
              Piece.create({ type: '*', x: 9, y: 5, isPlaced: true}),
              Piece.create({ type: '*', x: 9, y: 6, isPlaced: true}),
              Piece.create({ type: '*', x: 9, y: 8, isPlaced: true}),
            ]
          );
        });
      });

      context.skip('`UCHI FU ZUME`', () => {
      });
    });
  });
});
