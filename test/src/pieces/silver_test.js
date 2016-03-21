import Silver from '../../../frontend/src/shogi/pieces/silver';
import memo from 'memo-is';
import _ from 'lodash';

describe('Silver', () => {
  describe('#constructor', () => {
    context('black', () => {
      it('this.type is `S`', () => {
        var silver = new Silver({ type: 'S' });
        silver.should.have.property('type', 'S');
      });
    });

    context('white', () => {
      it('this.type is `s`', () => {
        var silver = new Silver({ type: 's' });
        silver.should.have.property('type', 's');
      });
    });

    context('unknown type', () => {
      it('throw exception', () => {
        (() => { new Silver({ type: '*' }); }).should.throw();
      });
    });
  });
});
