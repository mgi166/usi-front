import Pawn from '../../../frontend/src/shogi/pieces/pawn';
import memo from 'memo-is';
import _ from 'lodash';

describe('Pawn', () => {
  describe('#constructor', () => {
    context('black', () => {
      it('this.type is `p`', () => {
        var pawn = new Pawn({ type: 'P' });
        pawn.should.have.property('type', 'P');
      });
    });

    context('white', () => {
      it('this.type is `P`', () => {
        var pawn = new Pawn({ type: 'p' });
        pawn.should.have.property('type', 'p');
      });
    });

    context('unknown type', () => {
      it('throw exception', () => {
        (() => { new Pawn({ type: '*' }); }).should.throw();
      });
    });
  });

  describe('#promote', () => {
    context('black', () => {
      it('updates this.type', () => {
        var pawn = new Pawn({ type: 'P' });
        pawn.promote();
        pawn.should.have.property('type', 'P+');
      });
    });

    context('white', () => {
      it('updates this.type', () => {
        var pawn = new Pawn({ type: 'p' });
        pawn.promote();
        pawn.should.have.property('type', 'p+');
      });
    });
  });
});
