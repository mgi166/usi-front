import Board from '../../../../frontend/src/shogi/board';
import Piece from '../../../../frontend/src/shogi/piece';
import memo from 'memo-is';
import _ from 'lodash';

describe('#enhanceMovablePoint', () => {
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
          var piece = Piece.create({ type: 'L', x: 8, y: 5 });

          board().enhanceMovablePoint(piece);

          var movablePieces = board().board.map((row) => {
            return (
              row.filter((cell) => { return(cell.movable); })
            );
          });

          _.flattenDeep(movablePieces).should.eql(
            [
              Piece.create({ type: '*', x: 8, y: 1, movable: true }),
              Piece.create({ type: '*', x: 8, y: 2, movable: true }),
              Piece.create({ type: '*', x: 8, y: 3, movable: true }),
              Piece.create({ type: '*', x: 8, y: 4, movable: true }),
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
          var piece = Piece.create({ type: 'L', x: 8, y: 1 });

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
          var piece = Piece.create({ type: 'L', x: 8, y: 5 });

          board().enhanceMovablePoint(piece);

          var movablePieces = board().board.map((row) => {
            return (
              row.filter((cell) => { return(cell.movable); })
            );
          });

          _.flattenDeep(movablePieces).should.eql(
            [
              Piece.create({ type: 'p', x: 8, y: 2, movable: true }),
              Piece.create({ type: '*', x: 8, y: 3, movable: true }),
              Piece.create({ type: '*', x: 8, y: 4, movable: true })
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
        var piece = Piece.create({ type: 'L', x: 7, y: 2 });

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
          var piece = Piece.create({ type: 'l', x: 8, y: 2 });

          board().enhanceMovablePoint(piece);

          var movablePieces = board().board.map((row) => {
            return (
              row.filter((cell) => { return(cell.movable); })
            );
          });

          _.flattenDeep(movablePieces).should.eql(
            [
              Piece.create({ type: '*', x: 8, y: 3, movable: true }),
              Piece.create({ type: '*', x: 8, y: 4, movable: true }),
              Piece.create({ type: '*', x: 8, y: 5, movable: true }),
              Piece.create({ type: '*', x: 8, y: 6, movable: true }),
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
          var piece = Piece.create({ type: 'l', x: 8, y: 2 });

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
          var piece = Piece.create({ type: 'l', x: 8, y: 2 });

          board().enhanceMovablePoint(piece);

          var movablePieces = board().board.map((row) => {
            return (
              row.filter((cell) => { return(cell.movable); })
            );
          });

          _.flattenDeep(movablePieces).should.eql(
            [
              Piece.create({ type: '*', x: 8, y: 3, movable: true }),
              Piece.create({ type: '*', x: 8, y: 4, movable: true }),
              Piece.create({ type: 'P', x: 8, y: 5, movable: true })
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
        var piece = Piece.create({ type: 'l', x: 7, y: 2 });

        (() => { return board().enhanceMovablePoint(piece); }).should.throw();
      });
    });

    context.skip('if move piece, king is taken', () => {
    });
  });
});

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
            ['R', '*', '*'],
            ['*', '*', '*']
          ]
        );
      });

      it('change property of piece that is placeable', () => {
        var piece = Piece.create({ type: 'L', x: 0, y: 0});

        board().enhancePlaceablePoint(piece);

        var placeablePieces = board().board.map((row) => {
          return (
            row.filter((cell) => { return(cell.isPlaced); })
          );
        });

        _.flattenDeep(placeablePieces).should.eql(
          [
            Piece.create({ type: '*', x: 8, y: 2, isPlaced: true}),
            Piece.create({ type: '*', x: 7, y: 2, isPlaced: true}),
            Piece.create({ type: '*', x: 9, y: 3, isPlaced: true}),
            Piece.create({ type: '*', x: 8, y: 3, isPlaced: true}),
            Piece.create({ type: '*', x: 7, y: 3, isPlaced: true}),
          ]
        );
      });
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
        var piece = Piece.create({ type: 'l', x: 0, y: 0});

        board().enhancePlaceablePoint(piece);

        var placeablePieces = board().board.map((row) => {
          return (
            row.filter((cell) => { return(cell.isPlaced); })
          );
        });

        _.flattenDeep(placeablePieces).should.eql(
          [
            Piece.create({ type: '*', x: 9, y: 1, isPlaced: true}),
            Piece.create({ type: '*', x: 8, y: 1, isPlaced: true}),
            Piece.create({ type: '*', x: 9, y: 2, isPlaced: true}),
            Piece.create({ type: '*', x: 8, y: 2, isPlaced: true}),
            Piece.create({ type: '*', x: 9, y: 3, isPlaced: true}),
            Piece.create({ type: '*', x: 8, y: 3, isPlaced: true}),
            Piece.create({ type: '*', x: 9, y: 4, isPlaced: true}),
            Piece.create({ type: '*', x: 8, y: 4, isPlaced: true}),
            Piece.create({ type: '*', x: 9, y: 5, isPlaced: true}),
            Piece.create({ type: '*', x: 8, y: 5, isPlaced: true}),
            Piece.create({ type: '*', x: 9, y: 6, isPlaced: true}),
            Piece.create({ type: '*', x: 8, y: 6, isPlaced: true}),
            Piece.create({ type: '*', x: 8, y: 7, isPlaced: true}),
            Piece.create({ type: '*', x: 9, y: 8, isPlaced: true}),
            Piece.create({ type: '*', x: 8, y: 8, isPlaced: true}),
          ]
        );
      });
    });
  });
});

describe('#movePiece', () => {
  describe('black', () => {
    context('mismatch piece of first argument and piece in the board', () => {
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

      it('throw exception', () => {
        var fromPiece = Piece.create({type: 'L', x: 9, y: 2});
        var toPiece = Piece.create({type: 'L', x: 8, y: 1});
        (() => board().movePiece(fromPiece, toPiece)).should.throw();
      });
    });

    context('mismatch piece of second argument and piece in the board', () => {
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

      it('throw exception', () => {
        var fromPiece = Piece.create({type: 'L', x: 8, y: 5});
        var toPiece = Piece.create({type: 'P', x: 7, y: 1});
        (() => board().movePiece(fromPiece, toPiece)).should.throw();
      });
    });

    context('match piece of first argument and piece in the board', () => {
      context('toPiece is movable', () => {
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

        it('moves board', () => {
          var fromPiece = Piece.create({type: 'L', x: 8, y: 5});
          var toPiece = Piece.create({type: '*', x: 8, y: 1});

          var newBoard = board().movePiece(fromPiece, toPiece);

          new Board(newBoard).toArray().should.eql(
            [
              ['*', 'L', '*'],
              ['*', '*', '*'],
              ['*', '*', '*'],
              ['*', '*', '*'],
              ['*', '*', '*'],
              ['*', '*', '*']
            ]
          );
        });
      });

      context('toPiece is not movable', () => {
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

        it('does not move board', () => {
          var fromPiece = Piece.create({type: 'L', x: 8, y: 5});
          var toPiece = Piece.create({type: '*', x: 7, y: 4});

          var newBoard = board().movePiece(fromPiece, toPiece);

          new Board(newBoard).toArray().should.eql(
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
      });
    });
  });

  describe('white', () => {
  });
});
