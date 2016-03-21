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

  describe('#promote', () => {
    context('black', () => {
      it('does not update this.type', () => {
        var gold = new Gold({ type: 'G' });
        gold.promote();
        gold.should.have.property('type', 'G');
      });
    });

    context('white', () => {
      it('does not update this.type', () => {
        var gold = new Gold({ type: 'g' });
        gold.promote();
        gold.should.have.property('type', 'g');
      });
    });
  });

  describe('#unpromote', () => {
    context('black', () => {
      it('does not update this.type', () => {
        var gold = new Gold({ type: 'G' });
        gold.unpromote();
        gold.should.have.property('type', 'G');
      });
    });

    context('white', () => {
      it('does not update this.type', () => {
        var gold = new Gold({ type: 'g' });
        gold.unpromote();
        gold.should.have.property('type', 'g');
      });
    });
  });
});
