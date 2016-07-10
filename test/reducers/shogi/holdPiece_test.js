import shogi from '../../../frontend/reducers/shogi';
import * as Action from '../../../frontend/actions';
import Piece from '../../../frontend/src/shogi/piece';

describe('shogi', () => {
  describe('HOLD_PIECE', () => {
    context('given piece', () => {
      it('new state have piece at `holdingPiece`', () => {
        const piece = Piece.create({ type: 'p' });
        const action = Action.holdPiece(piece);
        const state = {};

        shogi(state, action).should.eql({
          ...state,
          holdingPiece: piece,
        });
      });
    });

    context('given empty piece', () => {
      it('does not change the state', () => {
        const piece = Piece.create({ type: '*' });
        const action = Action.holdPiece(piece);
        const state = {};

        shogi(state, action).should.eql(state);
      });
    });
  });
});
