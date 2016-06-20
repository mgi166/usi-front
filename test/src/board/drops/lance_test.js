import Board from '../../../../frontend/src/shogi/board';
import Piece from '../../../../frontend/src/shogi/piece';
import memo from 'memo-is';
import _ from 'lodash';

describe('Lance', () => {
  describe('#enhanceCanDropPosition', () => {
    describe('black', () => {
      context('the normal pattern', () => {
        const position = memo().is(() => {
          return (
            [
              ['*', '*', '*'],
              ['R', '*', '*'],
              ['*', '*', 'p'],
              ['*', '*', '*']
            ]
          );
        });

        it('change property of piece that is placeable', () => {
          const board = new Board(position());
          const piece = Piece.create({ type: 'L', x: 0, y: 0});

          const enhancedPositions = board.enhanceCanDropPosition(piece).board.map((row) => {
            return (
              row.filter((cell) => { return(cell.isPlaced); })
            );
          });

          _.flattenDeep(enhancedPositions).should.eql(
            [
              Piece.create({ type: '*', x: 8, y: 2, isPlaced: true}),
              Piece.create({ type: '*', x: 7, y: 2, isPlaced: true}),
              Piece.create({ type: '*', x: 9, y: 3, isPlaced: true}),
              Piece.create({ type: '*', x: 8, y: 3, isPlaced: true}),
              Piece.create({ type: '*', x: 9, y: 4, isPlaced: true}),
              Piece.create({ type: '*', x: 8, y: 4, isPlaced: true}),
              Piece.create({ type: '*', x: 7, y: 4, isPlaced: true}),
            ]
          );
        });
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
              ['*', 'P'],
              ['*', '*'],
              ['*', '*'],
              ['b', '*'],
              ['*', '*'],
              ['*', '*'],
            ]
          );
        });

        it('change property of piece that is placeable', () => {
          const board = new Board(position());
          const piece = Piece.create({ type: 'l', x: 0, y: 0});

          const enhancedPositions = board.enhanceCanDropPosition(piece).board.map((row) => {
            return (
              row.filter((cell) => { return(cell.isPlaced); })
            );
          });

          _.flattenDeep(enhancedPositions).should.eql(
            [
              Piece.create({ type: '*', x: 9, y: 1, isPlaced: true}),
              Piece.create({ type: '*', x: 8, y: 1, isPlaced: true}),
              Piece.create({ type: '*', x: 9, y: 2, isPlaced: true}),
              Piece.create({ type: '*', x: 8, y: 2, isPlaced: true}),
              Piece.create({ type: '*', x: 9, y: 3, isPlaced: true}),
              Piece.create({ type: '*', x: 8, y: 3, isPlaced: true}),
              Piece.create({ type: '*', x: 9, y: 4, isPlaced: true}),
              Piece.create({ type: '*', x: 9, y: 5, isPlaced: true}),
              Piece.create({ type: '*', x: 8, y: 5, isPlaced: true}),
              Piece.create({ type: '*', x: 9, y: 6, isPlaced: true}),
              Piece.create({ type: '*', x: 8, y: 6, isPlaced: true}),
              Piece.create({ type: '*', x: 8, y: 7, isPlaced: true}),
              Piece.create({ type: '*', x: 9, y: 8, isPlaced: true}),
              Piece.create({ type: '*', x: 8, y: 8, isPlaced: true}),
            ]
          );
        });
      });
    });
  });
});