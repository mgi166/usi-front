import Bishop from '../../../frontend/src/shogi/pieces/bishop';
import memo from 'memo-is';
import _ from 'lodash';

describe('Bishop', () => {
  describe('#constructor', () => {
    context('black', () => {
      it('this.type is `B`', () => {
        var bishop = new Bishop({ type: 'B' });
        bishop.should.have.property('type', 'B');
      });
    });

    context('white', () => {
      it('this.type is `b`', () => {
        var bishop = new Bishop({ type: 'b' });
        bishop.should.have.property('type', 'b');
      });
    });

    context('unknown type', () => {
      it('throw exception', () => {
        (() => { new Bishop({ type: '*' }); }).should.throw();
      });
    });
  });

  describe('#promote', () => {
    context('black', () => {
      it('updates this.type', () => {
        var bishop = new Bishop({ type: 'B' });
        bishop.promote();
        bishop.should.have.property('type', 'B+');
      });
    });

    context('white', () => {
      it('updates this.type', () => {
        var bishop = new Bishop({ type: 'b' });
        bishop.promote();
        bishop.should.have.property('type', 'b+');
      });
    });
  });

  describe('#unpromote', () => {
    context('black', () => {
      it('updates this.type', () => {
        var bishop = new Bishop({ type: 'B+' });
        bishop.unpromote();
        bishop.should.have.property('type', 'B');
      });
    });

    context('white', () => {
      it('updates this.type', () => {
        var bishop = new Bishop({ type: 'b+' });
        bishop.unpromote();
        bishop.should.have.property('type', 'b');
      });
    });
  });

  describe('#isPromoted', () => {
    context('promoted', () => {
      context('black', () => {
        it('returns true', () => {
          var bishop = new Bishop({ type: 'B+' });
          bishop.isPromoted().should.eql(true);
        });
      });

      context('white', () => {
        it('returns true', () => {
          var bishop = new Bishop({ type: 'b+' });
          bishop.isPromoted().should.eql(true);
        });
      });
    });

    context('no promoted', () => {
      context('black', () => {
        it('returns false', () => {
          var bishop = new Bishop({ type: 'B' });
          bishop.isPromoted().should.eql(false);
        });
      });

      context('white', () => {
        it('returns false', () => {
          var bishop = new Bishop({ type: 'b' });
          bishop.isPromoted().should.eql(false);
        });
      });
    });
  });

  describe('#moveDef', () => {
    context('black', () => {
      context('no promoted', () => {
        it('return move definition', () => {
          var bishop = new Bishop({ type: 'B' });
          bishop.moveDef().should.eql({
            fly: [
              [1, 1],
              [1, -1],
              [-1, 1],
              [-1, -1]
            ]
          });
        });
      });

      context('promoted', () => {
        it('return move definition', () => {
          var bishop = new Bishop({ type: 'B+' });
          bishop.moveDef().should.eql({
            fly: [
              [1, 1],
              [1, -1],
              [-1, 1],
              [-1, -1]
            ],
            just: [
              [1, 0],
              [-1, 0],
              [0, 1],
              [0, -1]
            ]
          });
        });
      });
    });

    context('white', () => {
      context('no promoted', () => {
        it('return move definition', () => {
          var bishop = new Bishop({ type: 'b' });
          bishop.moveDef().should.eql({
            fly: [
              [1, 1],
              [1, -1],
              [-1, 1],
              [-1, -1]
            ]
          });
        });
      });

      context('promoted', () => {
        it('return move definition', () => {
          var bishop = new Bishop({ type: 'b+' });
          bishop.moveDef().should.eql({
            fly: [
              [1, 1],
              [1, -1],
              [-1, 1],
              [-1, -1]
            ],
            just: [
              [1, 0],
              [-1, 0],
              [0, 1],
              [0, -1]
            ]
          });
        });
      });
    });
  });
});
