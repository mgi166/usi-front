import Board from '../../../../frontend/src/shogi/board';
import Piece from '../../../../frontend/src/shogi/piece';
import memo from 'memo-is';
import _ from 'lodash';

describe('#enhancePlaceablePoint', () => {
  describe('black', () => {
    context('the normal pattern', () => {
      const board = memo().is(() => {
        const _board = new Board;
        _board.setBoard(position());
        return(_board);
      });

      const position = memo().is(() => {
        return (
          [
            ['*', '*', '*'],
            ['R', '*', '*'],
            ['*', '*', '*']
          ]
        );
      });

      it('change property of piece that is placeable', () => {
        const piece = Piece.create({ type: 'L', x: 0, y: 0});

        board().enhancePlaceablePoint(piece);

        const placeablePieces = board().board.map((row) => {
          return (
            row.filter((cell) => { return(cell.isPlaced); })
          );
        });

        _.flattenDeep(placeablePieces).should.eql(
          [
            Piece.create({ type: '*', x: 8, y: 2, isPlaced: true}),
            Piece.create({ type: '*', x: 7, y: 2, isPlaced: true}),
            Piece.create({ type: '*', x: 9, y: 3, isPlaced: true}),
            Piece.create({ type: '*', x: 8, y: 3, isPlaced: true}),
            Piece.create({ type: '*', x: 7, y: 3, isPlaced: true}),
          ]
        );
      });
    });
  });

  describe('white', () => {
    context('the normal pattern', () => {
      const board = memo().is(() => {
        const _board = new Board;
        _board.setBoard(position());
        return(_board);
      });

      const position = memo().is(() => {
        return (
          [
            ['*', '*'],
            ['*', '*'],
            ['*', '*'],
            ['*', '*'],
            ['*', '*'],
            ['*', '*'],
            ['b', '*'],
            ['*', '*'],
            ['*', '*'],
          ]
        );
      });

      it('change property of piece that is placeable', () => {
        const piece = Piece.create({ type: 'l', x: 0, y: 0});

        board().enhancePlaceablePoint(piece);

        const placeablePieces = board().board.map((row) => {
          return (
            row.filter((cell) => { return(cell.isPlaced); })
          );
        });

        _.flattenDeep(placeablePieces).should.eql(
          [
            Piece.create({ type: '*', x: 9, y: 1, isPlaced: true}),
            Piece.create({ type: '*', x: 8, y: 1, isPlaced: true}),
            Piece.create({ type: '*', x: 9, y: 2, isPlaced: true}),
            Piece.create({ type: '*', x: 8, y: 2, isPlaced: true}),
            Piece.create({ type: '*', x: 9, y: 3, isPlaced: true}),
            Piece.create({ type: '*', x: 8, y: 3, isPlaced: true}),
            Piece.create({ type: '*', x: 9, y: 4, isPlaced: true}),
            Piece.create({ type: '*', x: 8, y: 4, isPlaced: true}),
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
