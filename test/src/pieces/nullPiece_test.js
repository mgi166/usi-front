import NullPiece from '../../../frontend/src/shogi/pieces/nullPiece';
import memo from 'memo-is';
import _ from 'lodash';

describe('NullPiece', () => {
  describe('#constructor', () => {
    it('this.type is `*`', () => {
      var piece = new NullPiece({ type: '*' });
      piece.type.should.eql('*');
    });
  });
});
