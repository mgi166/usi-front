import Knight from '../../../frontend/src/shogi/pieces/knight';
import memo from 'memo-is';
import _ from 'lodash';

describe('Knight', () => {
  describe('#constructor', () => {
    context('black', () => {
      it('this.type is `N`', () => {
        var knight = new Knight({ type: 'N' });
        knight.should.have.property('type', 'N');
      });
    });

    context('white', () => {
      it('this.type is `n`', () => {
        var knight = new Knight({ type: 'n' });
        knight.should.have.property('type', 'n');
      });
    });

    context('unknown type', () => {
      it('throw exception', () => {
        (() => { new Knight({ type: '*' }); }).should.throw();
      });
    });
  });
});
