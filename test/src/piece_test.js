//import assert from 'power-assert';
import Piece from '../../frontend/src/shogi/piece';

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
        new Piece({ type: 'P' }).isUsiBlack().should.eql(true);
      });
    });

    context('if white piece', () => {
      it('returns false', () => {
        new Piece({ type: 'p' }).isUsiBlack().should.eql(false);
      });
    });

    context('if empty piece', () => {
      it('returns false', () => {
        new Piece({ type: '*' }).isUsiBlack().should.eql(false);
      });
    });
  });

  describe('#isUsiWhite', () => {
    context('if white piece', () => {
      it('returns true', () => {
        new Piece({ type: 'p' }).isUsiWhite().should.eql(true);
      });
    });

    context('if black piece', () => {
      it('returns false', () => {
        new Piece({ type: 'P' }).isUsiWhite().should.eql(false);
      });
    });

    context('if empty piece', () => {
      it('returns false', () => {
        new Piece({ type: '*' }).isUsiWhite().should.eql(false);
      });
    });
  });
});
