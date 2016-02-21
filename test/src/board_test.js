import Board from '../../frontend/src/shogi/board';
import Piece from '../../frontend/src/shogi/piece';
import memo from 'memo-is';

describe('Borad', () => {
  describe('#enhanceMovablePoint', () => {
    context('porn', () => {
      context('case of black', () => {
        context('exists movable coordinates', () => {
          var board = memo().is(() => {
            return (
              [
                ['*', '*', '*'],
                ['*', 'P', '*']
              ]
            );
          });

          it('change property of piece that is moved', () => {
            var testBoard = new Board;
            var piece = new Piece({ type: 'P', x: 8, y: 2 });

            testBoard.setBoard(board());
            testBoard.enhanceMovablePoint(piece);

            var result = [];
            var movable = testBoard.board.forEach((row) => {
              var cell = row.filter((cell) => { return(cell.movable); });
              if (cell.length) { result.push(cell); }
            });

            [].concat.apply([], result).should.eql(
              [new Piece({ type: '*', x: 8, y: 1, movable: true })]
            );
          });
        });

        context('does not exist movable coordinates', () => {
          var board = memo().is(() => {
            return (
              [
                ['P', '*', '*'],
                ['*', '*', '*']
              ]
            );
          });

          it('does not change property of piece', () => {
            var testBoard = new Board;
            var piece = new Piece({ type: 'P', x: 9, y: 1 });

            testBoard.setBoard(board());
            testBoard.enhanceMovablePoint(piece);

            var result = [];
            var movable = testBoard.board.forEach((row) => {
              var cell = row.filter((cell) => { return(cell.movable); });
              if (cell.length) { result.push(cell); }
            });

            [].concat.apply([], result).should.eql([]);
          });
        });

        context.skip('if move piece, king is taken', () => {
        });
      });
    });
  });
});
