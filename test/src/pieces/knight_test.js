import Knight from '../../../frontend/src/shogi/pieces/knight';
import memo from 'memo-is';
import _ from 'lodash';

describe('Knight', () => {
  describe('#constructor', () => {
    context('black', () => {
      it('this.type is `N`', () => {
        var knight = new Knight({ type: 'N' });
        knight.should.have.property('type', 'N');
      });
    });

    context('white', () => {
      it('this.type is `n`', () => {
        var knight = new Knight({ type: 'n' });
        knight.should.have.property('type', 'n');
      });
    });

    context('unknown type', () => {
      it('throw exception', () => {
        (() => { new Knight({ type: '*' }); }).should.throw();
      });
    });
  });

  describe('#promote', () => {
    context('black', () => {
      it('updates this.type', () => {
        var knight = new Knight({ type: 'N' });
        knight.promote();
        knight.should.have.property('type', 'N+');
      });
    });

    context('white', () => {
      it('updates this.type', () => {
        var knight = new Knight({ type: 'n' });
        knight.promote();
        knight.should.have.property('type', 'n+');
      });
    });
  });

  describe('#unpromote', () => {
    context('black', () => {
      it('updates this.type', () => {
        var knight = new Knight({ type: 'N+' });
        knight.unpromote();
        knight.should.have.property('type', 'N');
      });
    });

    context('white', () => {
      it('updates this.type', () => {
        var knight = new Knight({ type: 'n+' });
        knight.unpromote();
        knight.should.have.property('type', 'n');
      });
    });
  });

  describe('#isPromoted', () => {
    context('promoted', () => {
      context('black', () => {
        it('returns true', () => {
          var knight = new Knight({ type: 'N+' });
          knight.isPromoted().should.eql(true);
        });
      });

      context('white', () => {
        it('returns true', () => {
          var knight = new Knight({ type: 'n+' });
          knight.isPromoted().should.eql(true);
        });
      });
    });

    context('no promoted', () => {
      context('black', () => {
        it('returns false', () => {
          var knight = new Knight({ type: 'N' });
          knight.isPromoted().should.eql(false);
        });
      });

      context('white', () => {
        it('returns false', () => {
          var knight = new Knight({ type: 'n' });
          knight.isPromoted().should.eql(false);
        });
      });
    });
  });

  describe('#moveDef', () => {
    context('black', () => {
      context('no promoted', () => {
        it('return move definition', () => {
          var knight = new Knight({ type: 'N' });
          knight.moveDef().should.eql({
            just: [
              [-1, -2],
              [1, -2]
            ]
          });
        });
      });

      context('promoted', () => {
        it('return move definition', () => {
          var knight = new Knight({ type: 'N+' });
          knight.moveDef().should.eql({
            just: [
              [1, -1],
              [1, 0],
              [1, 1],
              [0, -1],
              [0, 1],
              [-1, 0]
            ]
          });
        });
      });
    });

    context('white', () => {
      context('no promoted', () => {
        it('return move definition', () => {
          var knight = new Knight({ type: 'n' });
          knight.moveDef().should.eql({
            just: [
              [-1, 2],
              [1, 2]
            ]
          });
        });
      });

      context('promoted', () => {
        it('return move definition', () => {
          var knight = new Knight({ type: 'n+' });
          knight.moveDef().should.eql({
            just: [
              [-1, -1],
              [-1, 0],
              [-1, 1],
              [0, -1],
              [0, 1],
              [1, 0]
            ]
          });
        });
      });
    });
  });

  describe('#imageFileName', () => {
    context('black', () => {
      context('promoted', () => {
        it('return `Snkei.png`', () => {
          var knight = new Knight({ type: 'N+' });
          knight.imageFileName().should.eql('Snkei.png');
        });
      });

      context('no promote', () => {
        it('return `Skei.png`', () => {
          var knight = new Knight({ type: 'N' });
          knight.imageFileName().should.eql('Skei.png');
        });
      });
    });

    context('white', () => {
      context('promoted', () => {
        it('return `Gnkei.png`', () => {
          var knight = new Knight({ type: 'n+' });
          knight.imageFileName().should.eql('Gnkei.png');
        });
      });

      context('no promote', () => {
        it('return `Gkei.png`', () => {
          var knight = new Knight({ type: 'n' });
          knight.imageFileName().should.eql('Gkei.png');
        });
      });
    });
  });
});
