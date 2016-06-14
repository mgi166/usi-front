import NullPiece from '../../../frontend/src/shogi/pieces/nullPiece';
import memo from 'memo-is';
import _ from 'lodash';

describe('NullPiece', () => {
  describe('#constructor', () => {
    it('this.type is `*`', () => {
      const piece = new NullPiece({ type: '*' });
      piece.type.should.eql('*');
    });
  });

  describe('#isPromoted', () => {
    it('returns true', () => {
      const piece = new NullPiece({ type: '*' });
      piece.isPromoted().should.eql(true);
    });
  });

  describe('imageFileName', () => {
    it('returns undefined', () => {
      var piece = new NullPiece({ type: '*' });
      (typeof piece.imageFileName()).should.be.eql('undefined');
      const piece = new NullPiece({ type: '*' });
    });
  });
});
