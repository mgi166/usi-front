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

  describe('#promote', () => {
    context('black', () => {
      it('updates this.type', () => {
        var bishop = new Bishop({ type: 'B' });
        bishop.promote();
        bishop.should.have.property('type', 'B+');
      });
    });

    context('white', () => {
      it('updates this.type', () => {
        var bishop = new Bishop({ type: 'b' });
        bishop.promote();
        bishop.should.have.property('type', 'b+');
      });
    });
  });

  describe('#unpromote', () => {
    context('black', () => {
      it('updates this.type', () => {
        var bishop = new Bishop({ type: 'B+' });
        bishop.unpromote();
        bishop.should.have.property('type', 'B');
      });
    });

    context('white', () => {
      it('updates this.type', () => {
        var bishop = new Bishop({ type: 'b+' });
        bishop.unpromote();
        bishop.should.have.property('type', 'b');
      });
    });
  });
});
