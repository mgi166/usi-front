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
      var board = memo().is(() => {
        var _board = new Board;
        _board.setBoard(position());
        return(_board);
      });

      var position = memo().is(() => {
        return (
          [
            ['*', 'L', '*'],
            ['*', '*', '*']
          ]
        );
      });

      it('does not change property of piece', () => {
        var piece = new Piece({ type: 'L', x: 8, y: 1 });

        board().enhanceMovablePoint(piece);

        var movablePieces = board().board.map((row) => {
          return (
            row.filter((cell) => { return(cell.movable); })
          );
        });

        _.flattenDeep(movablePieces).should.eql([]);
      });
    });

    context('other piece exists', () => {
      var board = memo().is(() => {
        var _board = new Board;
        _board.setBoard(position());
        return(_board);
      });

      var position = memo().is(() => {
        return (
          [
            ['*', '*', '*'],
            ['*', 'p', '*'],
            ['*', '*', '*'],
            ['*', '*', '*'],
            ['*', 'L', '*'],
            ['*', '*', '*']
          ]
        );
      });

      it('change property of piece but not change property above other piece', () => {
        var piece = new Piece({ type: 'L', x: 8, y: 5 });

        board().enhanceMovablePoint(piece);

        var movablePieces = board().board.map((row) => {
          return (
            row.filter((cell) => { return(cell.movable); })
          );
        });

        _.flattenDeep(movablePieces).should.eql(
          [
            new Piece({ type: 'p', x: 8, y: 2, movable: true }),
            new Piece({ type: '*', x: 8, y: 3, movable: true }),
            new Piece({ type: '*', x: 8, y: 4, movable: true })
          ]
        );
      });
    });
  });

  context('mismatch the piece of coordinate', () => {
    var board = memo().is(() => {
      var _board = new Board;
      _board.setBoard(position());
      return(_board);
    });

    var position = memo().is(() => {
      return (
        [
          ['*', '*', '*'],
          ['*', 'L', '*']
        ]
      );
    });

    it('throw exception', () => {
      var piece = new Piece({ type: 'L', x: 7, y: 2 });

      (() => { return board().enhanceMovablePoint(piece); }).should.throw();
    });
  });

  context.skip('if move piece, king is taken', () => {
  });
});

describe('white', () => {
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
            ['*', 'l', '*'],
            ['*', '*', '*'],
            ['*', '*', '*'],
            ['*', '*', '*'],
            ['*', '*', '*']
          ]
        );
      });

      it('change property of piece is movable', () => {
        var piece = new Piece({ type: 'l', x: 8, y: 2 });

        board().enhanceMovablePoint(piece);

        var movablePieces = board().board.map((row) => {
          return (
            row.filter((cell) => { return(cell.movable); })
          );
        });

        _.flattenDeep(movablePieces).should.eql(
          [
            new Piece({ type: '*', x: 8, y: 3, movable: true }),
            new Piece({ type: '*', x: 8, y: 4, movable: true }),
            new Piece({ type: '*', x: 8, y: 5, movable: true }),
            new Piece({ type: '*', x: 8, y: 6, movable: true }),
          ]
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
            ['*', 'l', '*']
          ]
        );
      });

      it('does not change property of piece', () => {
        var piece = new Piece({ type: 'l', x: 8, y: 2 });

        board().enhanceMovablePoint(piece);

        var movablePieces = board().board.map((row) => {
          return (
            row.filter((cell) => { return(cell.movable); })
          );
        });

        _.flattenDeep(movablePieces).should.eql([]);
      });
    });

    context('other piece exists', () => {
      var board = memo().is(() => {
        var _board = new Board;
        _board.setBoard(position());
        return(_board);
      });

      var position = memo().is(() => {
        return (
          [
            ['*', '*', '*'],
            ['*', 'l', '*'],
            ['*', '*', '*'],
            ['*', '*', '*'],
            ['*', 'P', '*'],
            ['*', '*', '*']
          ]
        );
      });

      it('change property of piece but not change property above other piece', () => {
        var piece = new Piece({ type: 'l', x: 8, y: 2 });

        board().enhanceMovablePoint(piece);

        var movablePieces = board().board.map((row) => {
          return (
            row.filter((cell) => { return(cell.movable); })
          );
        });

        _.flattenDeep(movablePieces).should.eql(
          [
            new Piece({ type: '*', x: 8, y: 3, movable: true }),
            new Piece({ type: '*', x: 8, y: 4, movable: true }),
            new Piece({ type: 'P', x: 8, y: 5, movable: true })
          ]
        );
      });
    });
  });

  context('mismatch the piece of coordinate', () => {
    var board = memo().is(() => {
      var _board = new Board;
      _board.setBoard(position());
      return(_board);
    });

    var position = memo().is(() => {
      return (
        [
          ['*', '*', '*'],
          ['*', 'l', '*']
        ]
      );
    });

    it('throw exception', () => {
      var piece = new Piece({ type: 'l', x: 7, y: 2 });

      (() => { return board().enhanceMovablePoint(piece); }).should.throw();
    });
  });

  context.skip('if move piece, king is taken', () => {
  });
});

describe('#enhancePlaceablePoint', () => {
  describe('black', () => {
    context('the normal pattern', () => {
    });
  });

  describe('white', () => {
    context('the normal pattern', () => {
    });
  });
});
