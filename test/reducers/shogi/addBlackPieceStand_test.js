import shogi from '../../../frontend/reducers/shogi';
import * as Action from '../../../frontend/actions';
import Piece from '../../../frontend/src/shogi/piece';
import memo from 'memo-is';

describe('shogi', () => {
  describe('ADD_BLACK_PIECE_STAND', () => {
    context('when initial state', () => {
      it('add piece to blackPieceStand', () => {
        const piece = Piece.create({ type: 'P' });
        const action = Action.addBlackPieceStand(piece);

        shogi(undefined, action).should.have.property('blackPieceStand', [piece]);
      });
    });

    context('when already exist piece', () => {
      it('add new piece to blackPieceStand', () => {
        const piece = Piece.create({ type: 'P' });
        const action = Action.addBlackPieceStand(piece);
        const state = { blackPieceStand: [piece] };
        shogi(state, action).should.eql({
          ...state,
          blackPieceStand: [piece, piece],
        });
      });
    });
  });
});
