import Rook from '../../../frontend/src/shogi/pieces/rook';
import memo from 'memo-is';
import _ from 'lodash';

describe('Rook', () => {
  describe('#constructor', () => {
    context('black', () => {
      it('this.type is `R`', () => {
        var rook = new Rook({ type: 'R' });
        rook.should.have.property('type', 'R');
      });
    });

    context('white', () => {
      it('this.type is `r`', () => {
        var rook = new Rook({ type: 'r' });
        rook.should.have.property('type', 'r');
      });
    });

    context('unknown type', () => {
      it('throw exception', () => {
        (() => { new Rook({ type: '*' }); }).should.throw();
      });
    });
  });

  describe('#promote', () => {
    context('black', () => {
      it('updates this.type', () => {
        var rook = new Rook({ type: 'R' });
        rook.promote();
        rook.should.have.property('type', 'R+');
      });
    });

    context('white', () => {
      it('updates this.type', () => {
        var rook = new Rook({ type: 'r' });
        rook.promote();
        rook.should.have.property('type', 'r+');
      });
    });
  });

  describe('#unpromote', () => {
    context('black', () => {
      it('updates this.type', () => {
        var rook = new Rook({ type: 'R+' });
        rook.unpromote();
        rook.should.have.property('type', 'R');
      });
    });

    context('white', () => {
      it('updates this.type', () => {
        var rook = new Rook({ type: 'r+' });
        rook.unpromote();
        rook.should.have.property('type', 'r');
      });
    });
  });

  describe('#isPromoted', () => {
    context('promoted', () => {
      context('black', () => {
        it('returns true', () => {
          var rook = new Rook({ type: 'R+' });
          rook.isPromoted().should.eql(true);
        });
      });

      context('white', () => {
        it('returns true', () => {
          var rook = new Rook({ type: 'R+' });
          rook.isPromoted().should.eql(true);
        });
      });
    });

    context('no promoted', () => {
      context('black', () => {
        it('returns false', () => {
          var rook = new Rook({ type: 'R' });
          rook.isPromoted().should.eql(false);
        });
      });

      context('white', () => {
        it('returns false', () => {
          var rook = new Rook({ type: 'r' });
          rook.isPromoted().should.eql(false);
        });
      });
    });
  });

  describe('#moveDef', () => {
    context('black', () => {
      context('no promoted', () => {
        it('return move definition', () => {
          var rook = new Rook({ type: 'R' });
          rook.moveDef().should.eql({
            fly: [
              [0, -1],
              [0, 1],
              [1, 0],
              [-1, 0]
            ]
          });
        });
      });

      context('promoted', () => {
        it('return move definition', () => {
          var rook = new Rook({ type: 'R+' });
          rook.moveDef().should.eql({
            fly: [
              [0, -1],
              [0, 1],
              [1, 0],
              [-1, 0]
            ],
            just: [
              [1, -1],
              [1, 1],
              [-1, 1],
              [-1, -1]
            ]
          });
        });
      });
    });

    context('white', () => {
      context('no promoted', () => {
        it('return move definition', () => {
          var rook = new Rook({ type: 'r' });
          rook.moveDef().should.eql({
            fly: [
              [0, -1],
              [0, 1],
              [1, 0],
              [-1, 0]
            ]
          });
        });
      });

      context('promoted', () => {
        it('return move definition', () => {
          var rook = new Rook({ type: 'r+' });
          rook.moveDef().should.eql({
            fly: [
              [0, -1],
              [0, 1],
              [1, 0],
              [-1, 0]
            ],
            just: [
              [1, -1],
              [1, 1],
              [-1, 1],
              [-1, -1]
            ]
          });
        });
      });
    });
  });
});
