import shogi from '../../../frontend/reducers/shogi';
import * as Action from '../../../frontend/actions';
import Piece from '../../../frontend/src/shogi/piece';
import Board from '../../../frontend/src/shogi/board';
import memo from 'memo-is';

describe('shogi', () => {
  describe('DROP_PIECE', () => {
    const board = memo().is(() => {
      const board = new Board;
      board.board = [
        [
          Piece.create({ type: '*', x: 9, y: 1 }),
          Piece.create({ type: '*', x: 8, y: 1 }),
        ],
        [
          Piece.create({ type: '*', x: 9, y: 2 }),
          Piece.create({ type: '*', x: 8, y: 2 }),
        ]
      ];
      return board;
    });

    const expectedBoard = memo().is(() => {
      const expectedBoard = new Board;
      expectedBoard.board = [
        [
          Piece.create({ type: '*', x: 9, y: 1 }),
          Piece.create({ type: '*', x: 8, y: 1 }),
        ],
        [
          Piece.create({ type: '*', x: 9, y: 2 }),
          Piece.create({ type: 'P', x: 8, y: 2, dropped: true }),
        ]
      ];
      return expectedBoard;
    });

    it('return dropped board', () => {
      const fromPiece = Piece.create({ type: 'P' });
      const toPiece = Piece.create({ type: '*', x: 8, y: 2 });
      const action = Action.dropPiece(toPiece);
      const state = { board: board(), holdingPiece: fromPiece };

      shogi(state, action).should.eql({
        ...state,
        board: expectedBoard(),
        holdingPiece: undefined,
      });
    });
  });
});
