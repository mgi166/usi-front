import NullPiece from '../../../frontend/src/shogi/pieces/nullPiece';
import memo from 'memo-is';
import should from 'should';
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
      const piece = new NullPiece({ type: '*' });
      should(piece.imageFileName()).be.undefined();
    });
  });

    });
  });
});
