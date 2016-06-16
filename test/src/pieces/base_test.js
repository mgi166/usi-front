import Piece from '../../../frontend/src/shogi/piece';
import memo from 'memo-is';

describe('Base', () => {
  describe('#isBlackPromotePlace', () => {
    context('black', () => {
      context('promoted', () => {
        it('return false', () => {
          const pawn = Piece.create({ type: 'P+', y: 1 });
          pawn.isBlackPromotePlace().should.be.false();
        });
      });

      context('not promoted', () => {
        context('y = 1 or 2 or 3', () => {
          it('return true', () => {
            const pawn = Piece.create({ type: 'P', y: 1 });
            pawn.isBlackPromotePlace().should.be.true();
          });
        });

        context('y = others', () => {
          it('return false', () => {
            const pawn = Piece.create({ type: 'P', y: 9 });
            pawn.isBlackPromotePlace().should.be.false();
          });
        });
      });
    });

    context('white', () => {
      it('return false', () => {
        const pawn = Piece.create({ type: 'p', y: 1 });
        pawn.isBlackPromotePlace().should.be.false();
      });
    });
  });

  describe('#isWhitePromotePlace', () => {
    context('black', () => {
      it('return false', () => {
        const pawn = Piece.create({ type: 'P', y: 9 });
        pawn.isWhitePromotePlace().should.be.false();
      });
    });

    context('white', () => {
      context('promoted', () => {
        it('return true', () => {
          const pawn = Piece.create({ type: 'p+', y: 7 });
          pawn.isWhitePromotePlace().should.be.false();
        });
      });

      context('not promoted', () => {
        context('y = 7 or 8 or 9', () => {
          it('return true', () => {
            const pawn = Piece.create({ type: 'p', y: 7 });
            pawn.isWhitePromotePlace().should.be.true();
          });
        });

        context('y = others', () => {
          it('return false', () => {
            const pawn = Piece.create({ type: 'p', y: 1 });
            pawn.isWhitePromotePlace().should.be.false();
          });
        });
      });
    });
  });
});
