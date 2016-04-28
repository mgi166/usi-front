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

  describe('#unpromote', () => {
    context('black', () => {
      it('updates this.type', () => {
        var pawn = new Pawn({ type: 'P+' });
        pawn.unpromote();
        pawn.should.have.property('type', 'P');
      });
    });

    context('white', () => {
      it('updates this.type', () => {
        var pawn = new Pawn({ type: 'p+' });
        pawn.unpromote();
        pawn.should.have.property('type', 'p');
      });
    });
  });

  describe('#isPromoted', () => {
    context('promoted', () => {
      context('black', () => {
        it('returns true', () => {
          var pawn = new Pawn({ type: 'P+' });
          pawn.isPromoted().should.eql(true);
        });
      });

      context('white', () => {
        it('returns true', () => {
          var pawn = new Pawn({ type: 'p+' });
          pawn.isPromoted().should.eql(true);
        });
      });
    });

    context('no promoted', () => {
      context('black', () => {
        it('returns false', () => {
          var pawn = new Pawn({ type: 'P' });
          pawn.isPromoted().should.eql(false);
        });
      });

      context('white', () => {
        it('returns false', () => {
          var pawn = new Pawn({ type: 'p' });
          pawn.isPromoted().should.eql(false);
        });
      });
    });
  });

  describe('#moveDef', () => {
    context('black', () => {
      context('no promoted', () => {
        it('return move definition', () => {
          var pawn = new Pawn({ type: 'P' });
          pawn.moveDef().should.eql({
            just: [
              [0, -1]
            ]
          });
        });
      });

      context('promoted', () => {
        it('return move definition', () => {
          var pawn = new Pawn({ type: 'P+' });
          pawn.moveDef().should.eql({
            just: [
              [1, -1],
              [0, -1],
              [-1, -1],
              [1, 0],
              [-1, 0],
              [0, 1],
            ]
          });
        });
      });
    });

    context('white', () => {
      context('no promoted', () => {
        it('return move definition', () => {
          var pawn = new Pawn({ type: 'p' });
          pawn.moveDef().should.eql({
            just: [
              [0, 1]
            ]
          });
        });
      });

      context('promoted', () => {
        it('return move definition', () => {
          var pawn = new Pawn({ type: 'p+' });
          pawn.moveDef().should.eql({
            just: [
              [-1, 1],
              [0, 1],
              [1, 1],
              [1, 0],
              [-1, 0],
              [0, -1],
            ]
          });
        });
      });
    });
  });

  describe('#imageFileName', () => {
    context('black', () => {
      context('promoted', () => {
        it('return `Sto.png`', () => {
          var pawn = new Pawn({ type: 'P+' });
          pawn.imageFileName().should.eql('Sto.png');
        });
      });

      context('no promote', () => {
        it('return `Sfu.png`', () => {
          var pawn = new Pawn({ type: 'P' });
          pawn.imageFileName().should.eql('Sfu.png');
        });
      });
    });

    context('white', () => {
      context('promoted', () => {
        it('return `Gto.png`', () => {
          var pawn = new Pawn({ type: 'p+' });
          pawn.imageFileName().should.eql('Gto.png');
        });
      });

      context('no promote', () => {
        it('return `Gfu.png`', () => {
          var pawn = new Pawn({ type: 'p' });
          pawn.imageFileName().should.eql('Gfu.png');
        });
      });
    });
  });
});
