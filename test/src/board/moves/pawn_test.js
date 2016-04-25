import Board from '../../../../frontend/src/shogi/board';
import Piece from '../../../../frontend/src/shogi/piece';
import memo from 'memo-is';
import _ from 'lodash';

describe('#enhanceMovablePoint', () => {
  describe('black', () => {
    context('match the piece to coordinate', () => {
      context('exists movable coordinates', () => {
        var position = memo().is(() => {
          return (
            [
              ['*', '*', '*'],
              ['*', 'P', '*']
            ]
          );
        });

        it('change property of piece that is moved', () => {
          const board = new Board(position());
          const piece = Piece.create({ type: 'P', x: 8, y: 2 });

          board.enhanceMovablePoint(piece);

          var movablePieces = board.board.map((row) => {
            return (
              row.filter((cell) => { return(cell.movable); })
            );
          });

          _.flattenDeep(movablePieces).should.eql(
            [Piece.create({ type: '*', x: 8, y: 1, movable: true })]
          );
        });
      });

      context('does not exist movable coordinates', () => {
        var position = memo().is(() => {
          return (
            [
              ['P', '*', '*'],
              ['*', '*', '*']
            ]
          );
        });

        it('does not change property of piece', () => {
          const board = new Board(position());
          const piece = Piece.create({ type: 'P', x: 9, y: 1 });

          board.enhanceMovablePoint(piece);

          var movablePieces = board.board.map((row) => {
            return (
              row.filter((cell) => { return(cell.movable); })
            );
          });

          _.flattenDeep(movablePieces).should.eql([]);
        });
      });
    });

    context('mismatch the piece to coordinate', () => {
      var position = memo().is(() => {
        return (
          [
            ['*', '*', '*'],
            ['*', '*', 'P']
          ]
        );
      });

      it('throw exception', () => {
        const board = new Board(position());
        var piece = Piece.create({ type: 'P', x: 8, y: 2 });

        (() => { return board.enhanceMovablePoint(piece); }).should.throw();;
      });
    });

    context.skip('if move piece, king is taken', () => {
    });
  });

  describe('white', () => {
    context('match the piece to coordinate', () => {
      context('exists movable coordinates', () => {
        var position = memo().is(() => {
          return (
            [
              ['*', 'p', '*'],
              ['*', '*', '*']
            ]
          );
        });

        it('change property of piece that is moved', () => {
          const board = new Board(position());
          const piece = Piece.create({ type: 'p', x: 8, y: 1 });

          board.enhanceMovablePoint(piece);

          var movablePieces = board.board.map((row) => {
            return (
              row.filter((cell) => { return(cell.movable); })
            );
          });

          _.flattenDeep(movablePieces).should.eql(
            [Piece.create({ type: '*', x: 8, y: 2, movable: true })]
          );
        });
      });

      context('does not exist movable coordinates', () => {
        var position = memo().is(() => {
          return (
            [
              ['*', '*', '*'],
              ['p', '*', '*']
            ]
          );
        });

        it('does not change property of piece', () => {
          const board = new Board(position());
          const piece = Piece.create({ type: 'p', x: 9, y: 2 });

          board.enhanceMovablePoint(piece);

          var movablePieces = board.board.map((row) => {
            return (
              row.filter((cell) => { return(cell.movable); })
            );
          });

          _.flattenDeep(movablePieces).should.eql([]);
        });
      });
    });

    context('mismatch the piece to coordinate', () => {
      var position = memo().is(() => {
        return (
          [
            ['*', '*', 'p'],
            ['*', '*', '*']
          ]
        );
      });

      it('throw exception', () => {
        const board = new Board(position());
        const piece = Piece.create({ type: 'p', x: 9, y: 1 });

        (() => { return board.enhanceMovablePoint(piece); }).should.throw();;
      });
    });

    context.skip('if move piece, king is taken', () => {
    });
  });
});

describe('#movePiece', () => {
  context('match piece of first argument and piece in the board', () => {
    context('destination has movable property', () => {
      context.skip('promote', () => {
      });

      context('no promote', () => {
        var position = memo().is(() => {
          return (
            [
              ['*', '*', '*'],
              ['*', 'P', '*'],
              ['*', '*', '*']
            ]
          );
        });

        it('moves piece', () => {
          const board = new Board(position());
          const fromPiece = Piece.create({ type: 'P', x: 8, y: 2 });
          const toPiece = Piece.create({ type: '*', x: 8, y: 1 });

          board.movePiece(fromPiece, toPiece).toArray().should.eql(
            [
              ['*', 'P', '*'],
              ['*', '*', '*'],
              ['*', '*', '*']
            ]
          );
        });
      });
    });

    context('destination does not have movable property', () => {
      var position = memo().is(() => {
        return (
          [
            ['*', '*', '*'],
            ['*', 'P', '*'],
            ['*', '*', '*']
          ]
        );
      });

      it('does not move piece', () => {
        const board = new Board(position());
        const fromPiece = Piece.create({ type: 'P', x: 8, y: 2 });
        const toPiece = Piece.create({ type: '*', x: 8, y: 3 });

        board.movePiece(fromPiece, toPiece).toArray().should.eql(
          [
            ['*', '*', '*'],
            ['*', 'P', '*'],
            ['*', '*', '*']
          ]
        );
      });
    });
  });

  context('mismatch piece of first argument and piece in the board', () => {
    var position = memo().is(() => {
      return (
        [
          ['*', '*', '*'],
          ['*', 'P', '*'],
          ['*', '*', '*']
        ]
      );
    });

    it('throw exception', () => {
      const board = new Board(position());
      const fromPiece = Piece.create({ type: 'P', x: 8, y: 3 });
      const toPiece = Piece.create({ type: '*', x: 8, y: 1 });

      (() => { board.movePiece(fromPiece, toPiece); }).should.throw();
    });
  });
});

describe('#enhancePlaceablePoint', () => {
  describe('black', () => {
    context('the normal pattern', () => {
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
        const board = new Board(position());
        const piece = Piece.create({ type: 'P', x: 0, y: 0 });

        board.enhancePlaceablePoint(piece);

        const placeablePieces = board.board.map((row) => {
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
            Piece.create({ type: '*', x: 7, y: 3, isPlaced: true})
          ]
        );
      });
    });

    context('`NIFU`', () => {
      var position = memo().is(() => {
        return (
          [
            ['*', '*', '*'],
            ['B', '*', '*'],
            ['*', '*', '*'],
            ['*', 'P', '*']
          ]
        );
      });

      it('change property of piece that is placeable', () => {
        const board = new Board(position());
        const piece = Piece.create({ type: 'P', x: 0, y: 0 });

        board.enhancePlaceablePoint(piece);

        const placeablePieces = board.board.map((row) => {
          return (
            row.filter((cell) => { return(cell.isPlaced); })
          );
        });

        _.flattenDeep(placeablePieces).should.eql(
          [
            Piece.create({ type: '*', x: 7, y: 2, isPlaced: true}),
            Piece.create({ type: '*', x: 9, y: 3, isPlaced: true}),
            Piece.create({ type: '*', x: 7, y: 3, isPlaced: true}),
            Piece.create({ type: '*', x: 9, y: 4, isPlaced: true}),
            Piece.create({ type: '*', x: 7, y: 4, isPlaced: true})
          ]
        );
      });
    });

    context.skip('`UCHI FU ZUME`', () => {
    });
  });

  describe('white', () => {
    context('the normal pattern', () => {
      var position = memo().is(() => {
        return (
          [
            ['*', '*'],
            ['*', '*'],
            ['*', '*'],
            ['*', '*'],
            ['*', '*'],
            ['*', '*'],
            ['*', '*'],
            ['b', '*'],
            ['*', '*'],
          ]
        );
      });

      it('change property of piece that is placeable', () => {
        const board = new Board(position());
        const piece = Piece.create({ type: 'p', x: 0, y: 0 });

        board.enhancePlaceablePoint(piece);

        const placeablePieces = board.board.map((row) => {
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
            Piece.create({ type: '*', x: 9, y: 7, isPlaced: true}),
            Piece.create({ type: '*', x: 8, y: 7, isPlaced: true}),
            Piece.create({ type: '*', x: 8, y: 8, isPlaced: true}),
          ]
        );
      });
    });

    context('`NIFU`', () => {
      var position = memo().is(() => {
        return (
          [
            ['*', '*'],
            ['*', '*'],
            ['*', '*'],
            ['*', '*'],
            ['*', 'p'],
            ['*', '*'],
            ['b', '*'],
            ['*', '*'],
            ['*', '*'],
          ]
        );
      });

      it('change property of piece that is placeable', () => {
        const board = new Board(position());
        const piece = Piece.create({ type: 'p', x: 0, y: 0 });

        board.enhancePlaceablePoint(piece);

        const placeablePieces = board.board.map((row) => {
          return (
            row.filter((cell) => { return(cell.isPlaced); })
          );
        });

        _.flattenDeep(placeablePieces).should.eql(
          [
            Piece.create({ type: '*', x: 9, y: 1, isPlaced: true}),
            Piece.create({ type: '*', x: 9, y: 2, isPlaced: true}),
            Piece.create({ type: '*', x: 9, y: 3, isPlaced: true}),
            Piece.create({ type: '*', x: 9, y: 4, isPlaced: true}),
            Piece.create({ type: '*', x: 9, y: 5, isPlaced: true}),
            Piece.create({ type: '*', x: 9, y: 6, isPlaced: true}),
            Piece.create({ type: '*', x: 9, y: 8, isPlaced: true}),
          ]
        );
      });
    });

    context.skip('`UCHI FU ZUME`', () => {
    });
  });
});
