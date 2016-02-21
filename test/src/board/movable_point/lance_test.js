import Board from '../../../../frontend/src/shogi/board';
import Piece from '../../../../frontend/src/shogi/piece';
import memo from 'memo-is';
import _ from 'lodash';

describe('black', () => {
  context('match the piece of coordinate', () => {
    context('exists movable coordinates', () => {
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
            ['*', '*', '*'],
            ['*', '*', '*'],
            ['*', 'L', '*'],
            ['*', '*', '*']
          ]
        );
      });

      it('change property of piece is movable', () => {
        var piece = new Piece({ type: 'L', x: 8, y: 5 });

        board().enhanceMovablePoint(piece);

        var movablePieces = board().board.map((row) => {
          return (
            row.filter((cell) => { return(cell.movable); })
          );
        });

        _.flattenDeep(movablePieces).should.eql(
          [
            new Piece({ type: '*', x: 8, y: 1, movable: true }),
            new Piece({ type: '*', x: 8, y: 2, movable: true }),
            new Piece({ type: '*', x: 8, y: 3, movable: true }),
            new Piece({ type: '*', x: 8, y: 4, movable: true }),
          ]
        );
      });
    });

    context('does not exist movable coordinates', () => {
    });

    context('other piece exists', () => {
    });
  });

  context('mismatch the piece of coordinate', () => {
  });

  context.skip('if move piece, king is taken', () => {
  });
});
