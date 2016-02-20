//import assert from 'power-assert';
import Piece from '../../frontend/src/shogi/piece';

describe('Piece', () => {
  describe('#promote', () => {
    context('p', () => {
      it('should change type p+', () => {
        var piece = new Piece({ type: 'p' });
        piece.promote();
        piece.should.have.property('type', 'p+');
      });
    });
  });
});
