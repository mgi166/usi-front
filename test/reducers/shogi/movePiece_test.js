import shogi from '../../../frontend/reducers/shogi';
import * as Action from '../../../frontend/actions';
import Piece from '../../../frontend/src/shogi/piece';
import Board from '../../../frontend/src/shogi/board';
import memo from 'memo-is';

describe('shogi', () => {
  describe('MOVE_PIECE', () => {
    context('has property of `holdingPiece`', () => {
      const board = memo().is(() => {
        const board = new Board;
        board.board = [
          [
            Piece.create({ type: '*', x: 9, y: 1 }),
            Piece.create({ type: '*', x: 8, y: 1 }),
          ],
          [
            Piece.create({ type: '*', x: 9, y: 2 }),
            Piece.create({ type: 'P', x: 8, y: 2 }),
          ]
        ];
        return board;
      });

      const expectedBoard = memo().is(() => {
        const expectedBoard = new Board;
        expectedBoard.board = [
          [
            Piece.create({ type: '*', x: 9, y: 1 }),
            Piece.create({ type: 'P', x: 8, y: 1 }),
          ],
          [
            Piece.create({ type: '*', x: 9, y: 2 }),
            Piece.create({ type: '*', x: 8, y: 2 }),
          ]
        ];
        return expectedBoard;
      });

      it('return moved board and holdingPiece is undefined', () => {
        const toPiece = Piece.create({ type: '*', x: 8, y: 1 });
        const fromPiece = Piece.create({ type: 'P', x: 8, y: 2 });
        const action = Action.movePiece(toPiece);
        const state = { board: board(), holdingPiece: fromPiece };

        shogi(state, action).should.eql({
          ...state,
          board: expectedBoard(),
          holdingPiece: undefined,
        });
      });
    });

    context('does not have property of `holdingPiece`', () => {
      it('does not change state', () => {
        const toPiece = Piece.create({ type: '*', x: 8, y: 1 });
        const fromPiece = Piece.create({ type: 'P', x: 8, y: 2 });
        const action = Action.movePiece(toPiece);
        const state = { board: [[]] };

        shogi(state, action).should.eql(state);
      });
    });
  });
});
