import PieceStand from '../../frontend/src/shogi/pieceStand';
import Piece from '../../frontend/src/shogi/piece';
import memo from 'memo-is';
import _ from 'lodash';

describe('PieceStand', () => {
  describe('#add', () => {
    context('when add new type piece', () => {
      it('return piece', () => {
        const pieceStand = new PieceStand;
        const piece = Piece.create({ type: 'p' });

        pieceStand.add(piece).should.eql(piece);
      });

      it('store the added piece in piece stand', () => {
        const pieceStand = new PieceStand;
        const piece1 = Piece.create({ type: 'p' });
        const piece2 = Piece.create({ type: 'p' });
        const piece3 = Piece.create({ type: 'l' });
        const piece4 = Piece.create({ type: 'n' });

        pieceStand.add(piece1);
        pieceStand.add(piece2);
        pieceStand.add(piece3);
        pieceStand.add(piece4);

        pieceStand.pieces.size.should.eql(4);
        pieceStand.pieceTypes.should.eql(
          {
            p: 2,
            l: 1,
            n: 1
          }
        );
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
      pieceStand.pieces.size.should.eql(0);
      pieceStand.pieceTypes.should.eql({});
    });
  });
});
