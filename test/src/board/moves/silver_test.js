import Board from '../../../../frontend/src/shogi/board';
import Piece from '../../../../frontend/src/shogi/piece';
import memo from 'memo-is';
import _ from 'lodash';

describe('#enhanceMovablePosition', () => {
  context('black', () => {
    const position = memo().is(() => {
      return (
        [
          ['*', '*', '*'],
          ['*', 'S', '*'],
          ['*', '*', '*']
        ]
      );
    });

    it('movable property has true', () => {
      const board = new Board(position());
      const piece = Piece.create({type: 'S', x: 8, y: 2});

      board.enhanceMovablePosition(piece).board.should.eql(
        [
          [
            Piece.create({ movable: true, type: '*', x: 9, y: 1 }),
            Piece.create({ movable: true, type: '*', x: 8, y: 1 }),
            Piece.create({ movable: true, type: '*', x: 7, y: 1 }),
          ],
          [
            Piece.create({ movable: false, type: '*', x: 9, y: 2 }),
            Piece.create({ movable: false, type: 'S', x: 8, y: 2 }),
            Piece.create({ movable: false, type: '*', x: 7, y: 2 }),
          ],
          [
            Piece.create({ movable: true, type: '*', x: 9, y: 3 }),
            Piece.create({ movable: false, type: '*', x: 8, y: 3 }),
            Piece.create({ movable: true, type: '*', x: 7, y: 3 }),
          ],
        ]
      );
    });
  });

  context('white', () => {
    const position = memo().is(() => {
      return (
        [
          ['*', '*', '*'],
          ['*', 's', '*'],
          ['*', '*', '*']
        ]
      );
    });

    it('movable property has true', () => {
      const board = new Board(position());
      const piece = Piece.create({type: 's', x: 8, y: 2});

      board.enhanceMovablePosition(piece).board.should.eql(
        [
          [
            Piece.create({ movable: true, type: '*', x: 9, y: 1 }),
            Piece.create({ movable: false, type: '*', x: 8, y: 1 }),
            Piece.create({ movable: true, type: '*', x: 7, y: 1 }),
          ],
          [
            Piece.create({ movable: false, type: '*', x: 9, y: 2 }),
            Piece.create({ movable: false, type: 's', x: 8, y: 2 }),
            Piece.create({ movable: false, type: '*', x: 7, y: 2 }),
          ],
          [
            Piece.create({ movable: true, type: '*', x: 9, y: 3 }),
            Piece.create({ movable: true, type: '*', x: 8, y: 3 }),
            Piece.create({ movable: true, type: '*', x: 7, y: 3 }),
          ],
        ]
      );
    });
  });

  context.skip('mismatch piece of first argument and piece in the board', () => {
  });
});

describe('#movePiece', () => {
  context('mismatch piece of first argument and piece in the board', () => {
    const position = memo().is(() => {
      return (
        [
          ['*', '*', '*'],
          ['*', '*', '*'],
          ['*', 'S', '*'],
          ['*', '*', '*'],
          ['*', '*', '*'],
        ]
      );
    });

    it('throw exception', () => {
      const board = new Board(position());
      const fromPiece = Piece.create({type: 'S', x: 8, y: 2});
      const toPiece = Piece.create({type: '*', x: 7, y: 4});
      (() => board.movePiece(fromPiece, toPiece)).should.throw();
    });
  });

  context('mismatch piece of second argument and piece in the board', () => {
    const position = memo().is(() => {
      return (
        [
          ['*', '*', '*'],
          ['*', '*', '*'],
          ['*', 'S', '*'],
          ['*', '*', '*'],
          ['*', '*', '*'],
        ]
      );
    });

    it('throw exception', () => {
      const board = new Board(position());
      const fromPiece = Piece.create({type: 'S', x: 8, y: 3});
      const toPiece = Piece.create({type: 'P', x: 8, y: 4});
      (() => board.movePiece(fromPiece, toPiece)).should.throw();
    });
  });

  context('black', () => {
    context('toPiece is movable', () => {
      const position = memo().is(() => {
        return (
          [
            ['*', '*', '*'],
            ['*', '*', '*'],
            ['*', 'S', '*'],
            ['P', '*', '*'],
            ['*', '*', '*'],
          ]
        );
      });

      it('moves board', () => {
        const board = new Board(position());
        const fromPiece = Piece.create({type: 'S', x: 8, y: 3});
        const toPiece = Piece.create({type: '*', x: 9, y: 2});

        board.movePiece(fromPiece, toPiece).toArray().should.eql(
          [
            ['*', '*', '*'],
            ['S', '*', '*'],
            ['*', '*', '*'],
            ['P', '*', '*'],
            ['*', '*', '*'],
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
            ['*', 'S', '*'],
            ['P', '*', '*'],
            ['*', '*', '*'],
          ]
        );
      });

      it('does not move board', () => {
        const board = new Board(position());
        const fromPiece = Piece.create({type: 'S', x: 8, y: 3});
        const toPiece = Piece.create({type: '*', x: 8, y: 4});

        board.movePiece(fromPiece, toPiece).toArray().should.eql(
          [
            ['*', '*', '*'],
            ['*', '*', '*'],
            ['*', 'S', '*'],
            ['P', '*', '*'],
            ['*', '*', '*'],
          ]
        );
      });
    });
  });

  context('white', () => {
    context('toPiece is movable', () => {
      const position = memo().is(() => {
        return (
          [
            ['*', '*', '*'],
            ['*', '*', 'p'],
            ['*', 's', '*'],
            ['*', '*', '*'],
            ['*', '*', '*'],
          ]
        );
      });

      it('moves board', () => {
        const board = new Board(position());
        const fromPiece = Piece.create({type: 's', x: 8, y: 3});
        const toPiece = Piece.create({type: '*', x: 9, y: 2});

        board.movePiece(fromPiece, toPiece).toArray().should.eql(
          [
            ['*', '*', '*'],
            ['s', '*', 'p'],
            ['*', '*', '*'],
            ['*', '*', '*'],
            ['*', '*', '*'],
          ]
        );
      });
    });

    context('toPiece is not movable', () => {
      const position = memo().is(() => {
        return (
          [
            ['*', '*', '*'],
            ['*', '*', 'p'],
            ['*', 's', '*'],
            ['*', '*', '*'],
            ['*', '*', '*'],
          ]
        );
      });

      it('moves board', () => {
        const board = new Board(position());
        const fromPiece = Piece.create({type: 's', x: 8, y: 3});
        const toPiece = Piece.create({type: '*', x: 7, y: 3});

        board.movePiece(fromPiece, toPiece).toArray().should.eql(
          [
            ['*', '*', '*'],
            ['*', '*', 'p'],
            ['*', 's', '*'],
            ['*', '*', '*'],
            ['*', '*', '*'],
          ]
        );
      });
    });
  });
});
