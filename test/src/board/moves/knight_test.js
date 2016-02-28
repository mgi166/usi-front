import Board from '../../../../frontend/src/shogi/board';
import Piece from '../../../../frontend/src/shogi/piece';
import memo from 'memo-is';
import _ from 'lodash';

describe('#enhancePlaceablePoint', () => {
  describe('black', () => {
    context('the normal pattern', () => {
      var board = memo().is(() => {
        var _board = new Board;
        _board.setBoard(position());
        return(_board);
      });

      var position = memo().is(() => {
        return (
          [
            ['*', '*', '*'],
            ['*', '*', '*'],
            ['P', '*', '*'],
            ['*', '*', '*'],
          ]
        );
      });

      it('change property of piece that is placeable', () => {
        var piece = new Piece({ type: 'N', x: 0, y: 0 });

        board().enhancePlaceablePoint(piece);

        var placeablePieces = board().board.map((row) => {
          return (
            row.filter((cell) => { return(cell.isPlaced); })
          );
        });

        _.flattenDeep(placeablePieces).should.eql(
          [
            new Piece({ type: '*', x: 8, y: 3, isPlaced: true}),
            new Piece({ type: '*', x: 7, y: 3, isPlaced: true}),
            new Piece({ type: '*', x: 9, y: 4, isPlaced: true}),
            new Piece({ type: '*', x: 8, y: 4, isPlaced: true}),
            new Piece({ type: '*', x: 7, y: 4, isPlaced: true}),
          ]
        );
      });
    });

    context.skip('if move piece, king is taken', () => {
    });
  });

  describe('white', () => {
    context('the normal pattern', () => {
      var board = memo().is(() => {
        var _board = new Board;
        _board.setBoard(position());
        return(_board);
      });

      var position = memo().is(() => {
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
        var piece = new Piece({ type: 'n', x: 0, y: 0 });

        board().enhancePlaceablePoint(piece);

        var placeablePieces = board().board.map((row) => {
          return (
            row.filter((cell) => { return(cell.isPlaced); })
          );
        });

        _.flattenDeep(placeablePieces).should.eql(
          [
            new Piece({ type: '*', x: 9, y: 1, isPlaced: true}),
            new Piece({ type: '*', x: 8, y: 1, isPlaced: true}),
            new Piece({ type: '*', x: 9, y: 2, isPlaced: true}),
            new Piece({ type: '*', x: 8, y: 2, isPlaced: true}),
            new Piece({ type: '*', x: 9, y: 3, isPlaced: true}),
            new Piece({ type: '*', x: 8, y: 3, isPlaced: true}),
            new Piece({ type: '*', x: 9, y: 4, isPlaced: true}),
            new Piece({ type: '*', x: 8, y: 4, isPlaced: true}),
            new Piece({ type: '*', x: 9, y: 5, isPlaced: true}),
            new Piece({ type: '*', x: 8, y: 5, isPlaced: true}),
            new Piece({ type: '*', x: 9, y: 6, isPlaced: true}),
            new Piece({ type: '*', x: 8, y: 6, isPlaced: true}),
            new Piece({ type: '*', x: 8, y: 7, isPlaced: true}),
          ]
        );
      });
    });

    context.skip('if move piece, king is taken', () => {
    });
  });
});
