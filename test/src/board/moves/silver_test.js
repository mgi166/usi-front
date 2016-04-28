import Board from '../../../../frontend/src/shogi/board';
import Piece from '../../../../frontend/src/shogi/piece';
import memo from 'memo-is';
import _ from 'lodash';

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
