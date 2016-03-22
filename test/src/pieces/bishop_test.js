import Bishop from '../../../frontend/src/shogi/pieces/bishop';
import memo from 'memo-is';
import _ from 'lodash';

describe('Bishop', () => {
  describe('#constructor', () => {
    context('black', () => {
      it('this.type is `B`', () => {
        var bishop = new Bishop({ type: 'B' });
        bishop.should.have.property('type', 'B');
      });
    });

    context('white', () => {
      it('this.type is `b`', () => {
        var bishop = new Bishop({ type: 'b' });
        bishop.should.have.property('type', 'b');
      });
    });

    context('unknown type', () => {
      it('throw exception', () => {
        (() => { new Bishop({ type: '*' }); }).should.throw();
      });
    });
  });
});
