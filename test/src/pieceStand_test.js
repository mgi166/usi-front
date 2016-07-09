import PieceStand from '../../frontend/src/shogi/pieceStand';
import Piece from '../../frontend/src/shogi/piece';
import memo from 'memo-is';
import _ from 'lodash';

// NOTE: react-redux
import shallowEqual from 'react-redux/lib/utils/shallowEqual';

describe('PieceStand', () => {
  describe('#add', () => {
    context('when add new type piece', () => {
      it('store the added piece in piece stand', () => {
        const pieceStand = new PieceStand;
        const piece1 = Piece.create({ type: 'p' });
        const piece2 = Piece.create({ type: 'p' });
        const piece3 = Piece.create({ type: 'l' });
        const piece4 = Piece.create({ type: 'n' });

        const newPieceStand = pieceStand.add(piece1).add(piece2).add(piece3).add(piece4);

        newPieceStand.pieceTypes.should.eql(
          {
            p: 2,
            l: 1,
            n: 1
          }
        );
      });

      it('return new object', () => {
        const pieceStand = new PieceStand;
        const piece = Piece.create({ type: 'p' });

        const newPieceStand = pieceStand.add(piece);

        pieceStand.pieceTypes.should.eql({});
        newPieceStand.pieceTypes.should.eql({ p: 1 });
      });
    });
  });

  describe('#clear', () => {
    it('clear save objects', () => {
      const pieceStand = new PieceStand;
      const piece1 = Piece.create({ type: 'p' });
      const piece2 = Piece.create({ type: 'p' });
      const piece3 = Piece.create({ type: 'b' });

      pieceStand.clear();
      pieceStand.pieceTypes.should.eql({});
    });
  });

  describe('#clone', () => {
    it('return new pieceStand object', () => {
      const pieceStand = new PieceStand();
      const newPieceStand = pieceStand.clone();

      newPieceStand.should.not.equal(pieceStand);
    });

    it('does not reference same object', () => {
      const pieceStand = new PieceStand();
      const newPieceStand = pieceStand.clone();

      const piece1 = Piece.create({ type: 'p' });
      const piece2 = Piece.create({ type: 'n' });

      pieceStand.add(piece1);
      newPieceStand.pieceTypes.should.eql({});
    });

    it('copy the piece types that have old pieceStand', () => {
      const pieceStand = new PieceStand();
      const piece = Piece.create({ type: 'p' });

      const newPieceStand = pieceStand.add(piece);
      newPieceStand.clone().pieceTypes.should.eql({ p: 1 });
    });

    it('`shallowEqual` return false', () => {
      const pieceStand = new PieceStand();
      const newPieceStand = pieceStand.clone();

      shallowEqual(pieceStand, newPieceStand).should.be.false();
    });
  });
});
