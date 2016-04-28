import Board from '../../../../frontend/src/shogi/board';
import Piece from '../../../../frontend/src/shogi/piece';
import memo from 'memo-is';
import _ from 'lodash';

describe('#enhancePlaceablePoint', () => {
  describe('black', () => {
    context('the normal pattern', () => {
      const position = memo().is(() => {
        return (
          [
            ['*', '*', '*'],
            ['*', '*', '*'],
            ['P', '*', '*'],
            ['*', '*', '*'],
          ]
        );
      });

      it('change property of piece that is placeable', () => {
        const board = new Board(position());
        const piece = Piece.create({ type: 'N', x: 0, y: 0 });

        board.enhancePlaceablePoint(piece);

        const placeablePieces = board.board.map((row) => {
          return (
            row.filter((cell) => { return(cell.isPlaced); })
          );
        });

        _.flattenDeep(placeablePieces).should.eql(
          [
            Piece.create({ type: '*', x: 8, y: 3, isPlaced: true}),
            Piece.create({ type: '*', x: 7, y: 3, isPlaced: true}),
            Piece.create({ type: '*', x: 9, y: 4, isPlaced: true}),
            Piece.create({ type: '*', x: 8, y: 4, isPlaced: true}),
            Piece.create({ type: '*', x: 7, y: 4, isPlaced: true}),
          ]
        );
      });
    });

    context.skip('if move piece, king is taken', () => {
    });
  });

  describe('white', () => {
    context('the normal pattern', () => {
      const position = memo().is(() => {
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
        const board = new Board(position());
        const piece = Piece.create({ type: 'n', x: 0, y: 0 });

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
            Piece.create({ type: '*', x: 8, y: 7, isPlaced: true}),
          ]
        );
      });
    });

    context.skip('if move piece, king is taken', () => {
    });
  });
});

describe('#movePiece', () => {
  context('mismatch piece of first argument and piece in the board', () => {
    const position = memo().is(() => {
      return (
        [
          ['*', '*', '*'],
          ['*', 'n', '*'],
          ['*', '*', '*'],
          ['*', '*', '*'],
          ['*', 'N', '*'],
        ]
      );
    });

    it('throw exception', () => {
      const board = new Board(position());
      const fromPiece = Piece.create({type: 'N', x: 7, y: 5});
      const toPiece = Piece.create({type: '*', x: 9, y: 3});
      (() => board.movePiece(fromPiece, toPiece)).should.throw();
    });
  });

  context('mismatch piece of second argument and piece in the board', () => {
    const position = memo().is(() => {
      return (
        [
          ['*', '*', '*'],
          ['*', 'n', '*'],
          ['*', '*', '*'],
          ['*', '*', '*'],
          ['*', 'N', '*'],
        ]
      );
    });

    it('throw exception', () => {
      const board = new Board(position());
      const fromPiece = Piece.create({type: 'N', x: 8, y: 5});
      const toPiece = Piece.create({type: 'n', x: 9, y: 3});
      (() => board.movePiece(fromPiece, toPiece)).should.throw();
    });
  });

  describe('black', () => {
    const position = memo().is(() => {
      return (
        [
          ['*', '*', '*'],
          ['*', '*', '*'],
          ['*', '*', '*'],
          ['r', '*', '*'],
          ['*', 'N', '*'],
        ]
      );
    });

    context('toPiece is movable', () => {
      it('moves piece', () => {
        const board = new Board(position());
        const fromPiece = Piece.create({type: 'N', x: 8, y: 5});
        const toPiece = Piece.create({type: '*', x: 9, y: 3});

        board.movePiece(fromPiece, toPiece).toArray().should.eql(
          [
            ['*', '*', '*'],
            ['*', '*', '*'],
            ['N', '*', '*'],
            ['r', '*', '*'],
            ['*', '*', '*'],
          ]
        );
      });
    });

    context('toPiece is not movable', () => {
      it('does not move piece', () => {
        const board = new Board(position());
        const fromPiece = Piece.create({type: 'N', x: 8, y: 5});
        const toPiece = Piece.create({type: '*', x: 7, y: 4});

        board.movePiece(fromPiece, toPiece).toArray().should.eql(
          [
            ['*', '*', '*'],
            ['*', '*', '*'],
            ['*', '*', '*'],
            ['r', '*', '*'],
            ['*', 'N', '*'],
          ]
        );
      });
    });
  });

  describe('white', () => {
    const position = memo().is(() => {
      return (
        [
          ['*', '*', '*'],
          ['*', '*', '*'],
          ['*', 'n', '*'],
          ['P', '*', '*'],
          ['*', '*', '*'],
        ]
      );
    });

    context('toPiece is movable', () => {
      it('moves piece', () => {
        const board = new Board(position());
        const fromPiece = Piece.create({type: 'n', x: 8, y: 3});
        const toPiece = Piece.create({type: '*', x: 9, y: 5});

        board.movePiece(fromPiece, toPiece).toArray().should.eql(
          [
            ['*', '*', '*'],
            ['*', '*', '*'],
            ['*', '*', '*'],
            ['P', '*', '*'],
            ['n', '*', '*'],
          ]
        );
      });
    });

    context('toPiece is not movable', () => {
      it('does not move piece', () => {
        const board = new Board(position());
        const fromPiece = Piece.create({type: 'n', x: 8, y: 3});
        const toPiece = Piece.create({type: '*', x: 7, y: 4});

        board.movePiece(fromPiece, toPiece).toArray().should.eql(
          [
            ['*', '*', '*'],
            ['*', '*', '*'],
            ['*', 'n', '*'],
            ['P', '*', '*'],
            ['*', '*', '*'],
          ]
        );
      });
    });
  });
});
