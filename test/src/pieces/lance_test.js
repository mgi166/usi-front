import Lance from '../../../frontend/src/shogi/pieces/lance';
import memo from 'memo-is';
import _ from 'lodash';

describe('Lance', () => {
  describe('#constructor', () => {
    context('black', () => {
      it('this.type is `L`', () => {
        var lance = new Lance({ type: 'L' });
        lance.should.have.property('type', 'L');
      });
    });

    context('white', () => {
      it('this.type is `l`', () => {
        var lance = new Lance({ type: 'l' });
        lance.should.have.property('type', 'l');
      });
    });

    context('unknown type', () => {
      it('throw exception', () => {
        (() => { new Lance({ type: '*' }); }).should.throw();
      });
    });
  });

  describe('#promote', () => {
    context('black', () => {
      it('updates this.type', () => {
        var lance = new Lance({ type: 'L' });
        lance.promote();
        lance.should.have.property('type', 'L+');
      });
    });

    context('white', () => {
      it('updates this.type', () => {
        var lance = new Lance({ type: 'l' });
        lance.promote();
        lance.should.have.property('type', 'l+');
      });
    });
  });

  describe('#unpromote', () => {
    context('black', () => {
      it('updates this.type', () => {
        var lance = new Lance({ type: 'L+' });
        lance.unpromote();
        lance.should.have.property('type', 'L');
      });
    });

    context('white', () => {
      it('updates this.type', () => {
        var lance = new Lance({ type: 'l+' });
        lance.unpromote();
        lance.should.have.property('type', 'l');
      });
    });
  });
});
