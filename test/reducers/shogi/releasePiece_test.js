import shogi from '../../../frontend/reducers/shogi';
import * as Action from '../../../frontend/actions';
import Piece from '../../../frontend/src/shogi/piece';
import Board from '../../../frontend/src/shogi/board';
import memo from 'memo-is';

describe('shogi', () => {
  describe('RELEASE_PIECE', () => {
    context('given a piece', () => {
      const board = memo().is(() => {
        const board = new Board;
        board.board = [
          [
            Piece.create({ type: '*', x: 1, y: 1 }),
            Piece.create({ type: '*', x: 1, y: 2, movable: true }),
            Piece.create({ type: '*', x: 2, y: 1, isDrop: true }),
            Piece.create({ type: '*', x: 2, y: 2, dropped: true }),
          ]
        ];
        return board;
      });

      const expectedBoard = memo().is(() => {
        const expectedBoard = new Board;
        expectedBoard.board = [
          [
            Piece.create({ type: '*', x: 1, y: 1 }),
            Piece.create({ type: '*', x: 1, y: 2 }),
            Piece.create({ type: '*', x: 2, y: 1 }),
            Piece.create({ type: '*', x: 2, y: 2, dropped: true }),
          ]
        ];
        return expectedBoard;
      });

      it('has `holdingPiece` property with undefined', () => {
        const piece = Piece.create({ type: 'p' });
        const action = Action.releasePiece(piece);
        const state = { board: board(), holdingPiece: Piece.create({ type: 'b' }) };

        shogi(state, action).should.have.property('holdingPiece', undefined);
      });

      it('has `board` property with new board object', () => {
        const piece = Piece.create({ type: 'p' });
        const action = Action.releasePiece(piece);
        const state = { board: board(), holdingPiece: Piece.create({ type: 'b' }) };

        shogi(state, action).board.should.eql(expectedBoard());
      });
    });

    context('given a empty piece', () => {
      it('state does not change', () => {
        const piece = Piece.create({ type: '*' });
        const action = Action.releasePiece(piece);
        const state = { board: new Board };

        shogi(state, action).should.eql(state);
      });
    });
  });
});
