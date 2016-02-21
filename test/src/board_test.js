import Board from '../../frontend/src/shogi/board';
import Piece from '../../frontend/src/shogi/piece';
import sinon from 'sinon';
import memo from 'memo-is';

describe('Borad', () => {
  describe('#enhanceMovablePoint', () => {
    context('porn', () => {
      context('case of black', () => {
        context('exists movable coordinates', () => {
          var board = memo().is(() => {
            return (
              [
                ['l', 'n', 's', 'g', 'k', 'g', 's', 'n', 'l'],
                ['*', 'b', '*', '*', '*', '*', '*', 'r', '*'],
                ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
                ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
                ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
                ['*', '*', '*', '*', '*', '*', '*', 'P', '*'],
                ['P', 'P', 'P', 'P', 'P', 'P', 'P', '*', 'P'],
                ['*', 'B', '*', '*', '*', '*', '*', 'R', '*'],
                ['L', 'N', 'S', 'G', 'K', 'G', 'S', 'N', 'L']
              ]
            );
          });

          it('change property of piece that is moved', () => {
            var testBoard = new Board;
            var piece = new Piece({ type: 'P', x: 2, y: 6 });

            testBoard.setBoard(board);
            testBoard.enhanceMovablePoint(piece);

            var result = [];
            var movable = testBoard.board.forEach((row) => {
              var cell = row.filter((cell) => { return(cell.movable); });
              if (cell.length) { result.push(cell); }
            });

            [].concat.apply([], result).should.eql(
              [new Piece({ type: '*', x: 2, y: 5, movable: true })]
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
      });
    });
  });
});
