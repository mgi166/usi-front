import shogi from '../../../frontend/reducers/shogi';
import * as Action from '../../../frontend/actions';
import Piece from '../../../frontend/src/shogi/piece';
import memo from 'memo-is';

describe('shogi', () => {
  describe('ADD_WHITE_PIECE_STAND', () => {
    context('when initial state', () => {
      it('add piece to whitePieceStand', () => {
        const piece = Piece.create({ type: 'P' });
        const action = Action.addWhitePieceStand(piece);

        shogi(undefined, action).should.have.property('whitePieceStand', [piece]);
      });
    });

    context('when already exist piece', () => {
      it('add new piece to whitePieceStand', () => {
        const piece = Piece.create({ type: 'P' });
        const action = Action.addWhitePieceStand(piece);
        const state = { whitePieceStand: [piece] };
        shogi(state, action).should.eql({
          ...state,
          whitePieceStand: [piece, piece],
        });
      });
    });
  });
});
