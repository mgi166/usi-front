import Board from '../../frontend/src/shogi/board';
import Piece from '../../frontend/src/shogi/piece';
import sinon from 'sinon';
import memo from 'memo-is';

describe('Borad', () => {
  describe('#enhanceMovablePoint', () => {
    context('porn', () => {
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
        var piece = new Piece('P', 2, 6);
        testBoard.board = board;
        testBoard.enhanceMovablePoint(piece);

        var result = [];

        var movable = testBoard.board().forEach((row) => {
          var cell = row.filter((cell) => { return(cell.isMovable); });
          if (cell.length) { result.push(cell); }
        });
        result.should.eql([new Piece('*', 2, 5)]);
      });
    });
  });
});
