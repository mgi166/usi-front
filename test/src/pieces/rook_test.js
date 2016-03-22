import Rook from '../../../frontend/src/shogi/pieces/rook';
import memo from 'memo-is';
import _ from 'lodash';

describe('Rook', () => {
  describe('#constructor', () => {
    context('black', () => {
      it('this.type is `R`', () => {
        var rook = new Rook({ type: 'R' });
        rook.should.have.property('type', 'R');
      });
    });

    context('white', () => {
      it('this.type is `r`', () => {
        var rook = new Rook({ type: 'r' });
        rook.should.have.property('type', 'r');
      });
    });

    context('unknown type', () => {
      it('throw exception', () => {
        (() => { new Rook({ type: '*' }); }).should.throw();
      });
    });
  });
});
