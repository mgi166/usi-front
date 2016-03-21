import Gold from '../../../frontend/src/shogi/pieces/gold';
import memo from 'memo-is';
import _ from 'lodash';

describe('Gold', () => {
  describe('#constructor', () => {
    context('black', () => {
      it('this.type is `G`', () => {
        var gold = new Gold({ type: 'G' });
        gold.should.have.property('type', 'G');
      });
    });

    context('white', () => {
      it('this.type is `g`', () => {
        var gold = new Gold({ type: 'g' });
        gold.should.have.property('type', 'g');
      });
    });

    context('unknown type', () => {
      it('throw exception', () => {
        (() => { new Gold({ type: '*' }); }).should.throw();
      });
    });
  });
});
