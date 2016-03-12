import Board from '../../frontend/src/shogi/board';
import Piece from '../../frontend/src/shogi/piece';
import Turn from '../../frontend/src/shogi/turn';
import memo from 'memo-is';
import _ from 'lodash';

describe('isTakenKing', () => {
  context.skip("if take the piece, king is taken", () => {
    var board = memo().is(() => {
      var _board = new Board;
      _board.setBoard(position());
      return(_board);
    });

    var position = memo().is(() => {
      return (
        [
          ['*', 'p+', '*'],
          ['*', 'g', '*'],
          ['*', 'K', '*'],
        ]
      );
    });

    it('returns true', () => {
      board.isTakenKing(new Turn).should.eql(true);
    });
  });

  context.skip("if moves the piece, king is taken", () => {
  });
});
