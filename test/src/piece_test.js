//import assert from 'power-assert';
import Piece from '../../frontend/src/shogi/piece';
import should from 'should';

describe('Piece', () => {
  describe('create', () => {
    context('included type', () => {
      context('uppercase', () => {
        it('return instance inheritred from Piece', () => {
          var piece = Piece.create({ type: 'K' });
          piece.constructor.name.should.eql('King');
        });
      });

      context('downcase', () => {
        it('return instance inheritred from Piece', () => {
          var piece = Piece.create({ type: 'k' });
          piece.constructor.name.should.eql('King');
        });
      });
    });

    context('not found type', () => {
      it('return NullPiece instance', () => {
        var piece = Piece.create({ type: '*' });
        piece.constructor.name.should.eql('NullPiece');
      });
    });
  });
});
