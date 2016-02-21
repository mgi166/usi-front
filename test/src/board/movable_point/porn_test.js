import Board from '../../../../frontend/src/shogi/board';
import Piece from '../../../../frontend/src/shogi/piece';
import memo from 'memo-is';
import _ from 'lodash';

describe('black', () => {
  context('match the piece to coordinate', () => {
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
            ['*', 'P', '*']
          ]
        );
      });

      it('change property of piece that is moved', () => {
        var piece = new Piece({ type: 'P', x: 8, y: 2 });

        board().enhanceMovablePoint(piece);

        var movablePieces = board().board.map((row) => {
          return (
            row.filter((cell) => { return(cell.movable); })
          );
        });

        _.flattenDeep(movablePieces).should.eql(
          [new Piece({ type: '*', x: 8, y: 1, movable: true })]
        );
      });
    });

    context('does not exist movable coordinates', () => {
      var board = memo().is(() => {
        var _board = new Board;
        _board.setBoard(position());
        return(_board);
      });

      var position = memo().is(() => {
        return (
          [
            ['P', '*', '*'],
            ['*', '*', '*']
          ]
        );
      });

      it('does not change property of piece', () => {
        var piece = new Piece({ type: 'P', x: 9, y: 1 });

        board().enhanceMovablePoint(piece);

        var movablePieces = board().board.map((row) => {
          return (
            row.filter((cell) => { return(cell.movable); })
          );
        });

        _.flattenDeep(movablePieces).should.eql([]);
      });
    });
  });

  context('mismatch the piece to coordinate', () => {
    var board = memo().is(() => {
      var _board = new Board;
      _board.setBoard(position());
      return(_board);
    });

    var position = memo().is(() => {
      return (
        [
          ['*', '*', '*'],
          ['*', '*', 'P']
        ]
      );
    });

    it('throw exception', () => {
      var piece = new Piece({ type: 'P', x: 8, y: 2 });

      (() => { return board().enhanceMovablePoint(piece); }).should.throw();;
    });
  });

  context.skip('if move piece, king is taken', () => {
  });
});

describe('white', () => {
  context('match the piece to coordinate', () => {
    context('exists movable coordinates', () => {
      var board = memo().is(() => {
        var _board = new Board;
        _board.setBoard(position());
        return(_board);
      });

      var position = memo().is(() => {
        return (
          [
            ['*', 'p', '*'],
            ['*', '*', '*']
          ]
        );
      });

      it('change property of piece that is moved', () => {
        var piece = new Piece({ type: 'p', x: 8, y: 1 });

        board().enhanceMovablePoint(piece);

        var movablePieces = board().board.map((row) => {
          return (
            row.filter((cell) => { return(cell.movable); })
          );
        });

        _.flattenDeep(movablePieces).should.eql(
          [new Piece({ type: '*', x: 8, y: 2, movable: true })]
        );
      });
    });

    context('does not exist movable coordinates', () => {
      var board = memo().is(() => {
        var _board = new Board;
        _board.setBoard(position());
        return(_board);
      });

      var position = memo().is(() => {
        return (
          [
            ['*', '*', '*'],
            ['p', '*', '*']
          ]
        );
      });

      it('does not change property of piece', () => {
        var piece = new Piece({ type: 'p', x: 9, y: 2 });

        board().enhanceMovablePoint(piece);

        var movablePieces = board().board.map((row) => {
          return (
            row.filter((cell) => { return(cell.movable); })
          );
        });

        _.flattenDeep(movablePieces).should.eql([]);
      });
    });
  });

  context('mismatch the piece to coordinate', () => {
    var board = memo().is(() => {
      var _board = new Board;
      _board.setBoard(position());
      return(_board);
    });

    var position = memo().is(() => {
      return (
        [
          ['*', '*', 'p'],
          ['*', '*', '*']
        ]
      );
    });

    it('throw exception', () => {
      var piece = new Piece({ type: 'p', x: 9, y: 1 });

      (() => { return board().enhanceMovablePoint(piece); }).should.throw();;
    });
  });

  context.skip('if move piece, king is taken', () => {
  });
});