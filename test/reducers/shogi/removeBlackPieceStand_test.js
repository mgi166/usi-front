import shogi from '../../../frontend/reducers/shogi';
import * as Action from '../../../frontend/actions';
import Piece from '../../../frontend/src/shogi/piece';
import memo from 'memo-is';

describe('shogi', () => {
  describe('removeBlackPieceStand', () => {
    context('when initial state', () => {
      it('returns', () => {
        const piece = Piece.create({ type: 'P' });
        const action = Action.removeBlackPieceStand(piece);

        shogi(undefined, action).should.have.property('blackPieceStand', []);
      });
    });

    context('when piece exist on blackPieceStand', () => {
      context('match piece type', () => {
        it('remove piece on blackPieceStand', () => {
          const piece = Piece.create({ type: 'P' });
          const action = Action.removeBlackPieceStand(piece);
          const state = { blackPieceStand: [piece] };

          shogi(state, action).should.eql({
            ...state,
            blackPieceStand: [],
          });
        });
      });

      context('does not match piece type', () => {
        it('does not change state', () => {
          const piece1 = Piece.create({ type: 'b' });
          const piece2 = Piece.create({ type: 'p' });
          const action = Action.removeBlackPieceStand(piece1);
          const state = { blackPieceStand: [piece2] };

          shogi(state, action).should.eql({ ...state });
        });
      });

      context('match multipul pieces in blackPieceStand', () => {
        it('remove the piece that match type at first', () => {
          const piece1 = Piece.create({ type: 'b' });
          const piece2 = Piece.create({ type: 'p' });
          const piece3 = Piece.create({ type: 'p' });

          const action = Action.removeBlackPieceStand(Piece.create({ type: 'p' }));
          const state = { blackPieceStand: [piece1, piece2, piece3] };

          shogi(state, action).should.eql({
              ...state,
            blackPieceStand: [piece1, piece3],
          });
        });
      });
    });
  });
});
