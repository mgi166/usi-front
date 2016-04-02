import Silver from '../../../frontend/src/shogi/pieces/silver';
import memo from 'memo-is';
import _ from 'lodash';

describe('Silver', () => {
  describe('#constructor', () => {
    context('black', () => {
      it('this.type is `S`', () => {
        var silver = new Silver({ type: 'S' });
        silver.should.have.property('type', 'S');
      });
    });

    context('white', () => {
      it('this.type is `s`', () => {
        var silver = new Silver({ type: 's' });
        silver.should.have.property('type', 's');
      });
    });

    context('unknown type', () => {
      it('throw exception', () => {
        (() => { new Silver({ type: '*' }); }).should.throw();
      });
    });
  });

  describe('#promote', () => {
    context('black', () => {
      it('updates this.type', () => {
        var silver = new Silver({ type: 'S' });
        silver.promote();
        silver.should.have.property('type', 'S+');
      });
    });

    context('white', () => {
      it('updates this.type', () => {
        var silver = new Silver({ type: 's' });
        silver.promote();
        silver.should.have.property('type', 's+');
      });
    });
  });

  describe('#unpromote', () => {
    context('black', () => {
      it('updates this.type', () => {
        var silver = new Silver({ type: 'S+' });
        silver.unpromote();
        silver.should.have.property('type', 'S');
      });
    });

    context('white', () => {
      it('updates this.type', () => {
        var silver = new Silver({ type: 's+' });
        silver.unpromote();
        silver.should.have.property('type', 's');
      });
    });
  });

  describe('#isPromoted', () => {
    context('promoted', () => {
      context('black', () => {
        it('returns true', () => {
          var silver = new Silver({ type: 'S+' });
          silver.isPromoted().should.eql(true);
        });
      });

      context('white', () => {
        it('returns true', () => {
          var silver = new Silver({ type: 's+' });
          silver.isPromoted().should.eql(true);
        });
      });
    });

    context('no promoted', () => {
      context('black', () => {
        it('returns false', () => {
          var silver = new Silver({ type: 'S' });
          silver.isPromoted().should.eql(false);
        });
      });

      context('white', () => {
        it('returns false', () => {
          var silver = new Silver({ type: 's' });
          silver.isPromoted().should.eql(false);
        });
      });
    });
  });

  describe('#moveDef', () => {
    context('black', () => {
      context('no promoted', () => {
        it('return move definition', () => {
          var silver = new Silver({ type: 'S' });
          silver.moveDef().should.eql({
            just: [
              [1, -1],
              [1, 0],
              [1, 1],
              [-1, -1],
              [-1, 1]
            ]
          });
        });
      });

      context('promoted', () => {
        it('return move definition', () => {
          var silver = new Silver({ type: 'S+' });
          silver.moveDef().should.eql({
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
          var silver = new Silver({ type: 's' });
          silver.moveDef().should.eql({
            just: [
              [-1, -1],
              [-1, 0],
              [-1, 1],
              [1, -1],
              [1, 1]
            ]
          });
        });
      });

      context('promoted', () => {
        it('return move definition', () => {
          var silver = new Silver({ type: 's+' });
          silver.moveDef().should.eql({
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
        it('return `Sngin.png`', () => {
          var silver = new Silver({ type: 'S+' });
          silver.imageFileName().should.eql('Sngin.png');
        });
      });

      context('no promote', () => {
        it('return `Sgin.png`', () => {
          var silver = new Silver({ type: 'S' });
          silver.imageFileName().should.eql('Sgin.png');
        });
      });
    });

    context('white', () => {
      context('promoted', () => {
        it('return `Gngin.png`', () => {
          var silver = new Silver({ type: 's+' });
          silver.imageFileName().should.eql('Gngin.png');
        });
      });

      context('no promote', () => {
        it('return `Ggin.png`', () => {
          var silver = new Silver({ type: 's' });
          silver.imageFileName().should.eql('Ggin.png');
        });
      });
    });
  });
});
