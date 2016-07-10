import shogi from '../../../frontend/reducers/shogi';
import * as Action from '../../../frontend/actions';
import Piece from '../../../frontend/src/shogi/piece';
import Board from '../../../frontend/src/shogi/board';
import memo from 'memo-is';

describe('shogi', () => {
  describe('ENHANCE_MOVABLE_POSITION', () => {
    context('given a piece', () => {
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
            Piece.create({ type: '*', x: 8, y: 1, movable: true }),
          ],
          [
            Piece.create({ type: '*', x: 9, y: 2 }),
            Piece.create({ type: 'P', x: 8, y: 2 }),
          ]
        ];
        return expectedBoard;
      });

      it('new state have piece at `holdingPiece`', () => {
        const piece = Piece.create({ type: 'P', x: 8, y: 2 });
        const action = Action.enhanceMovablePoint(piece);
        const state = { board: board() };
        shogi(state, action).board.should.eql(expectedBoard());
      });
    });

    context('given empty piece', () => {
      it('does not change the state', () => {
        const piece = Piece.create({ type: '*' });
        const action = Action.enhanceMovablePoint(piece);
        const state = {};

        shogi(state, action).should.eql(state);
      });
    });
  });
});

