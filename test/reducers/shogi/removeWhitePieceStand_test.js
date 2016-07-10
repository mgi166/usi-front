import shogi from '../../../frontend/reducers/shogi';
import * as Action from '../../../frontend/actions';
import Piece from '../../../frontend/src/shogi/piece';
import memo from 'memo-is';

describe('shogi', () => {
  describe('removeWhitePieceStand', () => {
    context('when initial state', () => {
      it('returns', () => {
        const piece = Piece.create({ type: 'P' });
        const action = Action.removeWhitePieceStand(piece);

        shogi(undefined, action).should.have.property('whitePieceStand', []);
      });
    });

    context('when piece exist on whitePieceStand', () => {
      context('match piece type', () => {
        it('remove piece on whitePieceStand', () => {
          const piece = Piece.create({ type: 'P' });
          const action = Action.removeWhitePieceStand(piece);
          const state = { whitePieceStand: [piece] };

          shogi(state, action).should.eql({
            ...state,
            whitePieceStand: [],
          });
        });
      });

      context('does not match piece type', () => {
        it('does not change state', () => {
          const piece1 = Piece.create({ type: 'b' });
          const piece2 = Piece.create({ type: 'p' });
          const action = Action.removeWhitePieceStand(piece1);
          const state = { whitePieceStand: [piece2] };

          shogi(state, action).should.eql({ ...state });
        });
      });

      context('match multipul pieces in whitePieceStand', () => {
        it('remove the piece that match type at first', () => {
          const piece1 = Piece.create({ type: 'b' });
          const piece2 = Piece.create({ type: 'p' });
          const piece3 = Piece.create({ type: 'p' });

          const action = Action.removeWhitePieceStand(Piece.create({ type: 'p' }));
          const state = { whitePieceStand: [piece1, piece2, piece3] };

          shogi(state, action).should.eql({
              ...state,
            whitePieceStand: [piece1, piece3],
          });
        });
      });
    });
  });
});
