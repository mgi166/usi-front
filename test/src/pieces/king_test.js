import King from '../../../frontend/src/shogi/pieces/king';
import memo from 'memo-is';
import _ from 'lodash';

describe('King', () => {
  describe('#constructor', () => {
    context('black', () => {
      it('this.type is `K`', () => {
        var king = new King({ type: 'K' });
        king.should.have.property('type', 'K');
      });
    });

    context('white', () => {
      it('this.type is `k`', () => {
        var king = new King({ type: 'k' });
        king.should.have.property('type', 'k');
      });
    });

    context('unknown type', () => {
      it('throw exception', () => {
        (() => { new King({ type: '*' }); }).should.throw();
      });
    });
  });

  describe('#promote', () => {
    context('black', () => {
      it('does not update this.type', () => {
        var king = new King({ type: 'K' });
        king.promote();
        king.should.have.property('type', 'K');
      });
    });

    context('white', () => {
      it('does not update this.type', () => {
        var king = new King({ type: 'k' });
        king.promote();
        king.should.have.property('type', 'k');
      });
    });
  });

  describe('#unpromote', () => {
    context('black', () => {
      it('does not update this.type', () => {
        var king = new King({ type: 'K' });
        king.unpromote();
        king.should.have.property('type', 'K');
      });
    });

    context('white', () => {
      it('does not update this.type', () => {
        var king = new King({ type: 'k' });
        king.unpromote();
        king.should.have.property('type', 'k');
      });
    });
  });

  describe('#isPromoted', () => {
    context('black', () => {
      it('returns true', () => {
        var king = new King({ type: 'K' });
        king.isPromoted().should.eql(true);
      });
    });

    context('white', () => {
      it('returns true', () => {
        var king = new King({ type: 'k' });
        king.isPromoted().should.eql(true);
      });
    });
  });

  describe('#moveDef', () => {
    context('black', () => {
      it('return move definition', () => {
        var king = new King({ type: 'K' });
        king.moveDef().should.eql({
          just: [
            [1, 1],
            [1, 0],
            [1, -1],
            [0, 1],
            [0, -1],
            [-1, -1],
            [-1, 0],
            [-1, 1]
          ]
        });
      });
    });

    context('white', () => {
      it('return move definition', () => {
        var king = new King({ type: 'k' });
        king.moveDef().should.eql({
          just: [
            [1, 1],
            [1, 0],
            [1, -1],
            [0, 1],
            [0, -1],
            [-1, -1],
            [-1, 0],
            [-1, 1]
          ]
        });
      });
    });
  });

  describe('#imageFileName', () => {
    context('black', () => {
      it('return `Sou.png`', () => {
        var king = new King({ type: 'K' });
        king.imageFileName().should.eql('Sou.png');
      });
    });

    context('white', () => {
      it('return `Gou.png`', () => {
        var king = new King({ type: 'k' });
        king.imageFileName().should.eql('Gou.png');
      });
    });
  });
});
