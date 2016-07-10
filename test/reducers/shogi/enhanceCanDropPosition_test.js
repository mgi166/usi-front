import shogi from '../../../frontend/reducers/shogi';
import * as Action from '../../../frontend/actions';
import Piece from '../../../frontend/src/shogi/piece';
import Board from '../../../frontend/src/shogi/board';
import memo from 'memo-is';

describe('shogi', () => {
  describe('ENHANCE_CAN_DROP_PIECE', () => {
    const board = memo().is(() => {
      const board = new Board;
      board.board = [
        [
          Piece.create({ type: '*', x: 9, y: 1 }),
          Piece.create({ type: '*', x: 8, y: 1 }),
          Piece.create({ type: '*', x: 7, y: 1 }),
        ],
        [
          Piece.create({ type: '*', x: 9, y: 2 }),
          Piece.create({ type: 'P', x: 8, y: 2 }),
          Piece.create({ type: '*', x: 7, y: 2 }),
        ],
        [
          Piece.create({ type: '*', x: 9, y: 3 }),
          Piece.create({ type: '*', x: 8, y: 3 }),
          Piece.create({ type: '*', x: 7, y: 3 }),
        ],
      ];
      return board;
    });

    const expectedBoard = memo().is(() => {
      const expectedBoard = new Board;
      expectedBoard.board = [
        [
          Piece.create({ type: '*', x: 9, y: 1 }),
          Piece.create({ type: '*', x: 8, y: 1 }),
          Piece.create({ type: '*', x: 7, y: 1 }),
        ],
        [
          Piece.create({ type: '*', x: 9, y: 2, isDrop: true }),
          Piece.create({ type: 'P', x: 8, y: 2 }),
          Piece.create({ type: '*', x: 7, y: 2, isDrop: true }),
        ],
        [
          Piece.create({ type: '*', x: 9, y: 3, isDrop: true }),
          Piece.create({ type: '*', x: 8, y: 3 }),
          Piece.create({ type: '*', x: 7, y: 3, isDrop: true }),
        ],
      ];
      return expectedBoard;
    });

    it('have property of `isDrop` if piece can be dropped', () => {
      const piece = Piece.create({ type: 'P' });
      const action = Action.enhanceCanDropPosition(piece);
      const state = { board: board() };

      shogi(state, action).should.eql({
        ...state,
        board: expectedBoard(),
      });
    });
  });
});
