//import assert from 'power-assert';
import Piece from '../../frontend/src/shogi/piece';
import should from 'should';

describe('Piece', () => {
  describe('#promote', () => {
    context('p', () => {
      it('should change type p+', () => {
        var piece = new Piece({ type: 'p' });
        piece.promote();
        piece.should.have.property('type', 'p+');
      });
    });
  });

  describe('#isUsiBlack', () => {
    context('if black piece', () => {
      it('returns true', () => {
        new Piece({ type: '*' })
          .isUsiBlack(new Piece({ type: 'P' }))
          .should.eql(true);
      });
    });

    context('if white piece', () => {
      it('returns false', () => {
        new Piece({ type: '*' })
          .isUsiBlack(new Piece({ type: 'p' }))
          .should.eql(false);
      });
    });

    context('if empty piece', () => {
      it('returns false', () => {
        new Piece({ type: '*' })
          .isUsiBlack(new Piece({ type: '*' }))
          .should.eql(false);
      });
    });
  });

  describe('#isUsiWhite', () => {
    context('if white piece', () => {
      it('returns true', () => {
        new Piece({ type: '*' })
          .isUsiWhite(new Piece({ type: 'p' }))
          .should.eql(true);
      });
    });

    context('if black piece', () => {
      it('returns false', () => {
        new Piece({ type: '*' })
          .isUsiWhite(new Piece({ type: 'P' }))
          .should.eql(false);
      });
    });

    context('if empty piece', () => {
      it('returns false', () => {
        new Piece({ type: '*' })
          .isUsiWhite(new Piece({ type: '*' }))
          .should.eql(false);
      });
    });
  });

  describe('#team', () => {
    context('black piece', () => {
      it('returns "black"', () => {
        new Piece({ type: 'P' }).team().should.eql('black');
      });
    });

    context('white piece', () => {
      new Piece({ type: 'p' }).team().should.eql('white');
    });

    context('other piece', () => {
      should(new Piece({ type: '*' }).team()).be.undefined();
    });
  });
});
