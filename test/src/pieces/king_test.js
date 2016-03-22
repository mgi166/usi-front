import King from '../../../frontend/src/shogi/pieces/king';
import memo from 'memo-is';
import _ from 'lodash';

describe('King', () => {
  describe('#constructor', () => {
    context('black', () => {
      it('this.type is `K`', () => {
        var king = new King({ type: 'K' });
        king.should.have.property('type', 'K');
      });
    });

    context('white', () => {
      it('this.type is `k`', () => {
        var king = new King({ type: 'k' });
        king.should.have.property('type', 'k');
      });
    });

    context('unknown type', () => {
      it('throw exception', () => {
        (() => { new King({ type: '*' }); }).should.throw();
      });
    });
  });
});
