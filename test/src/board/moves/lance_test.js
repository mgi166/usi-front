import Board from '../../../../frontend/src/shogi/board';
import Piece from '../../../../frontend/src/shogi/piece';
import memo from 'memo-is';
import _ from 'lodash';

describe('Lance', () => {
  describe('#enhanceMovablePosition', () => {
    describe('black', () => {
      context('match the piece of coordinate', () => {
        context('exists movable coordinates', () => {
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
            const board = new Board(position());
            const piece = Piece.create({ type: 'L', x: 8, y: 5 });

            const movablePieces = board.enhanceMovablePosition(piece).board.map((row) => {
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
          var position = memo().is(() => {
            return (
              [
                ['*', 'L', '*'],
                ['*', '*', '*']
              ]
            );
          });

          it('does not change property of piece', () => {
            const board = new Board(position());
            const piece = Piece.create({ type: 'L', x: 8, y: 1 });

            const movablePieces = board.enhanceMovablePosition(piece).board.map((row) => {
              return (
                row.filter((cell) => { return(cell.movable); })
              );
            });

            _.flattenDeep(movablePieces).should.eql([]);
          });
        });

        context('other piece exists', () => {
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
            const board = new Board(position());
            const piece = Piece.create({ type: 'L', x: 8, y: 5 });

            const movablePieces = board.enhanceMovablePosition(piece).board.map((row) => {
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
        var position = memo().is(() => {
          return (
            [
              ['*', '*', '*'],
              ['*', 'L', '*']
            ]
          );
        });

        it('throw exception', () => {
          const board = new Board(position());
          const piece = Piece.create({ type: 'L', x: 7, y: 2 });

          (() => { return board.enhanceMovablePosition(piece); }).should.throw();
        });
      });

      context.skip('if move piece, king is taken', () => {
      });
    });

    describe('white', () => {
      context('match the piece of coordinate', () => {
        context('exists movable coordinates', () => {
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
            const board = new Board(position());
            const piece = Piece.create({ type: 'l', x: 8, y: 2 });

            const movablePieces = board.enhanceMovablePosition(piece).board.map((row) => {
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
          var position = memo().is(() => {
            return (
              [
                ['*', '*', '*'],
                ['*', 'l', '*']
              ]
            );
          });

          it('does not change property of piece', () => {
            const board = new Board(position());
            const piece = Piece.create({ type: 'l', x: 8, y: 2 });

            var movablePieces = board.enhanceMovablePosition(piece).board.map((row) => {
              return (
                row.filter((cell) => { return(cell.movable); })
              );
            });

            _.flattenDeep(movablePieces).should.eql([]);
          });
        });

        context('other piece exists', () => {
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
            const board = new Board(position());
            const piece = Piece.create({ type: 'l', x: 8, y: 2 });

            const movablePieces = board.enhanceMovablePosition(piece).board.map((row) => {
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
        var position = memo().is(() => {
          return (
            [
              ['*', '*', '*'],
              ['*', 'l', '*']
            ]
          );
        });

        it('throw exception', () => {
          const board = new Board(position());
          const piece = Piece.create({ type: 'l', x: 7, y: 2 });

          (() => { return board.enhanceMovablePosition(piece); }).should.throw();
        });
      });

      context.skip('if move piece, king is taken', () => {
      });
    });
  });

  describe('#movePiece', () => {
    describe('black', () => {
      context('mismatch piece of first argument and piece in the board', () => {
        const position = memo().is(() => {
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
          const board = new Board(position());
          const fromPiece = Piece.create({type: 'L', x: 9, y: 2});
          const toPiece = Piece.create({type: 'L', x: 8, y: 1});
          (() => board.movePiece(fromPiece, toPiece)).should.throw();
        });
      });

      context('mismatch piece of second argument and piece in the board', () => {
        const position = memo().is(() => {
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
          const board = new Board(position());
          const fromPiece = Piece.create({type: 'L', x: 8, y: 5});
          const toPiece = Piece.create({type: 'L', x: 7, y: 1});

          (() => board.movePiece(fromPiece, toPiece)).should.throw();
        });
      });

      context('match piece of first argument and piece in the board', () => {
        context('toPiece is movable', () => {
          const position = memo().is(() => {
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
            const board = new Board(position());
            const fromPiece = Piece.create({type: 'L', x: 8, y: 5});
            const toPiece = Piece.create({type: '*', x: 8, y: 1});

            board.movePiece(fromPiece, toPiece).toArray().should.eql(
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
          const position = memo().is(() => {
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
            const board = new Board(position());
            const fromPiece = Piece.create({type: 'L', x: 8, y: 5});
            const toPiece = Piece.create({type: '*', x: 7, y: 4});

            board.movePiece(fromPiece, toPiece).toArray().should.eql(
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
      context('toPiece is movable', () => {
        const position = memo().is(() => {
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

        it('moves board', () => {
          const board = new Board(position());
          const fromPiece = Piece.create({type: 'l', x: 8, y: 2});
          const toPiece = Piece.create({type: '*', x: 8, y: 5});

          board.movePiece(fromPiece, toPiece).toArray().should.eql(
            [
              ['*', '*', '*'],
              ['*', '*', '*'],
              ['*', '*', '*'],
              ['*', '*', '*'],
              ['*', 'l', '*'],
              ['*', '*', '*']
            ]
          );
        });
      });

      context('toPiece is not movable', () => {
        const position = memo().is(() => {
          return (
            [
              ['*', '*', '*'],
              ['*', '*', '*'],
              ['*', 'l', '*'],
              ['*', '*', '*'],
              ['*', '*', '*'],
              ['*', '*', '*']
            ]
          );
        });

        it('does not move board', () => {
          const board = new Board(position());
          const fromPiece = Piece.create({type: 'l', x: 8, y: 3});
          const toPiece = Piece.create({type: '*', x: 7, y: 5});

          board.movePiece(fromPiece, toPiece).toArray().should.eql(
            [
              ['*', '*', '*'],
              ['*', '*', '*'],
              ['*', 'l', '*'],
              ['*', '*', '*'],
              ['*', '*', '*'],
              ['*', '*', '*']
            ]
          );
        });
      });
    });
  });
});
