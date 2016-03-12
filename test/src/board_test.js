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

describe('#invertCor', () => {
  var board = memo().is(() => {
    var _board = new Board;
    _board.setBoard(position());
    return(_board);
  });

  var position = memo().is(() => {
    return (
      [
        ['l', 'n', 's', 'g', 'k', 'g', 's', 'n', 'l'],
        ['*', 'b', '*', '*', '*', '*', '*', 'r', '*'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
        ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
        ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['*', 'B', '*', '*', '*', '*', '*', 'R', '*'],
        ['L', 'N', 'S', 'G', 'K', 'G', 'S', 'N', 'L']
      ]
    );
  });

  it('pawn with 2, 7', () => {
    var [x, y] = board().invertCor(2, 7);
    board().board[y][x].type.should.eql('P');
    board().board[y][x].x.should.eql(2);
    board().board[y][x].y.should.eql(7);
  });

  it('* with 3, 6', () => {
    var [x, y] = board().invertCor(3, 6);
    board().board[y][x].type.should.eql('*');
    board().board[y][x].x.should.eql(3);
    board().board[y][x].y.should.eql(6);
  });
});
