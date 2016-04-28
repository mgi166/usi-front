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
          ['*', 'B', '*'],
          ['*', '*', '*'],
          ['*', '*', '*'],
        ]
      );
    });

    it('throw exception', () => {
      const board = new Board(position());
      const fromPiece = Piece.create({type: 'B', x: 8, y: 2});
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
          ['*', 'B', '*'],
          ['*', '*', '*'],
          ['*', '*', '*'],
        ]
      );
    });

    it('throw exception', () => {
      const board = new Board(position());
      const fromPiece = Piece.create({type: 'B', x: 8, y: 3});
      const toPiece = Piece.create({type: 'P', x: 8, y: 4});
      (() => board.movePiece(fromPiece, toPiece)).should.throw();
    });
  });

  context('black', () => {
    context('toPiece is movable', () => {
      const position = memo().is(() => {
        return (
          [
            ['*', '*', '*', '*', '*'],
            ['*', '*', '*', '*', '*'],
            ['*', '*', 'B', '*', '*'],
            ['*', '*', '*', 'P', '*'],
            ['*', '*', '*', '*', '*']
          ]
        );
      });

      it('moves board', () => {
        const board = new Board(position());
        const fromPiece = Piece.create({type: 'B', x: 7, y: 3});
        const toPiece = Piece.create({type: '*', x: 9, y: 1});

        board.movePiece(fromPiece, toPiece).toArray().should.eql(
          [
            ['B', '*', '*', '*', '*'],
            ['*', '*', '*', '*', '*'],
            ['*', '*', '*', '*', '*'],
            ['*', '*', '*', 'P', '*'],
            ['*', '*', '*', '*', '*']
          ]
        );
      });
    });

    context('toPiece is not movable', () => {
      const position = memo().is(() => {
        return (
          [
            ['*', '*', '*', '*', '*'],
            ['*', '*', '*', '*', '*'],
            ['*', '*', 'B', '*', '*'],
            ['*', '*', '*', 'P', '*'],
            ['*', '*', '*', '*', '*']
          ]
        );
      });

      it('does not move board', () => {
        const board = new Board(position());
        const fromPiece = Piece.create({type: 'B', x: 7, y: 3});
        const toPiece = Piece.create({type: '*', x: 5, y: 5});

        board.movePiece(fromPiece, toPiece).toArray().should.eql(
          [
            ['*', '*', '*', '*', '*'],
            ['*', '*', '*', '*', '*'],
            ['*', '*', 'B', '*', '*'],
            ['*', '*', '*', 'P', '*'],
            ['*', '*', '*', '*', '*']
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
            ['*', '*', '*', '*', '*'],
            ['*', '*', '*', '*', '*'],
            ['*', '*', 'b', '*', '*'],
            ['*', '*', '*', 'p', '*'],
            ['*', '*', '*', '*', '*']
          ]
        );
      });

      it('moves board', () => {
        const board = new Board(position());
        const fromPiece = Piece.create({type: 'b', x: 7, y: 3});
        const toPiece = Piece.create({type: '*', x: 9, y: 1});

        board.movePiece(fromPiece, toPiece).toArray().should.eql(
          [
            ['b', '*', '*', '*', '*'],
            ['*', '*', '*', '*', '*'],
            ['*', '*', '*', '*', '*'],
            ['*', '*', '*', 'p', '*'],
            ['*', '*', '*', '*', '*']
          ]
        );
      });
    });

    context('toPiece is not movable', () => {
      const position = memo().is(() => {
        return (
          [
            ['*', '*', '*', '*', '*'],
            ['*', '*', '*', '*', '*'],
            ['*', '*', 'b', '*', '*'],
            ['*', '*', '*', 'p', '*'],
            ['*', '*', '*', '*', '*']
          ]
        );
      });

      it('moves board', () => {
        const board = new Board(position());
        const fromPiece = Piece.create({type: 'b', x: 7, y: 3});
        const toPiece = Piece.create({type: '*', x: 5, y: 5});

        board.movePiece(fromPiece, toPiece).toArray().should.eql(
          [
            ['*', '*', '*', '*', '*'],
            ['*', '*', '*', '*', '*'],
            ['*', '*', 'b', '*', '*'],
            ['*', '*', '*', 'p', '*'],
            ['*', '*', '*', '*', '*']
          ]
        );
      });
    });
  });
});
