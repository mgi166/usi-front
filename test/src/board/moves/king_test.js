import Board from '../../../../frontend/src/shogi/board';
import Piece from '../../../../frontend/src/shogi/piece';
import memo from 'memo-is';
import _ from 'lodash';

describe('#enhanceMovablePoint', () => {
  describe('black', () => {
    var board = memo().is(() => {
      var _board = new Board;
      _board.setBoard(position());
      return(_board);
    });

    var position = memo().is(() => {
      return (
        [
          ['*', 'p', '*'],
          ['*', 'K', '*'],
          ['P', '*', '*'],
          ['*', '*', '*'],
        ]
      );
    });

    context('normal case', () => {
      it('change property of piece is movable', () => {
        var piece = Piece.create({ type: 'K', x: 8, y: 2 });

        board().enhanceMovablePoint(piece);

        var movablePieces = board().board.map((row) => {
          return (
            row.filter((cell) => { return(cell.movable); })
          );
        });

        _.flattenDeep(movablePieces).should.eql(
          [
            Piece.create({ type: '*', x: 9, y: 1, movable: true }),
            Piece.create({ type: 'p', x: 8, y: 1, movable: true }),
            Piece.create({ type: '*', x: 7, y: 1, movable: true }),
            Piece.create({ type: '*', x: 9, y: 2, movable: true }),
            Piece.create({ type: '*', x: 7, y: 2, movable: true }),
            Piece.create({ type: '*', x: 8, y: 3, movable: true }),
            Piece.create({ type: '*', x: 7, y: 3, movable: true }),
          ]
        );
      });
    });

    context.skip('if moves the piece, king is taken', () => {
    });

    context.skip('if take the piece, king is taken', () => {
    });
  });

  describe('white', () => {
  });
});

