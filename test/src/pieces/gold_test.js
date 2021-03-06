import Gold from '../../../frontend/src/shogi/pieces/gold';
import memo from 'memo-is';
import _ from 'lodash';

describe('Gold', () => {
  describe('#constructor', () => {
    context('black', () => {
      it('this.type is `G`', () => {
        var gold = new Gold({ type: 'G' });
        gold.should.have.property('type', 'G');
      });
    });

    context('white', () => {
      it('this.type is `g`', () => {
        var gold = new Gold({ type: 'g' });
        gold.should.have.property('type', 'g');
      });
    });

    context('unknown type', () => {
      it('throw exception', () => {
        (() => { new Gold({ type: '*' }); }).should.throw();
      });
    });
  });

  describe('#promote', () => {
    context('black', () => {
      it('does not update this.type', () => {
        var gold = new Gold({ type: 'G' });
        gold.promote();
        gold.should.have.property('type', 'G');
      });
    });

    context('white', () => {
      it('does not update this.type', () => {
        var gold = new Gold({ type: 'g' });
        gold.promote();
        gold.should.have.property('type', 'g');
      });
    });
  });

  describe('#unpromote', () => {
    context('black', () => {
      it('does not update this.type', () => {
        var gold = new Gold({ type: 'G' });
        gold.unpromote();
        gold.should.have.property('type', 'G');
      });
    });

    context('white', () => {
      it('does not update this.type', () => {
        var gold = new Gold({ type: 'g' });
        gold.unpromote();
        gold.should.have.property('type', 'g');
      });
    });
  });

  describe('#isPromoted', () => {
    context('black', () => {
      it('returns true', () => {
        var gold = new Gold({ type: 'G' });
        gold.isPromoted().should.eql(true);
      });
    });

    context('white', () => {
      it('returns true', () => {
        var gold = new Gold({ type: 'g' });
        gold.isPromoted().should.eql(true);
      });
    });
  });

  describe('#moveDef', () => {
    context('black', () => {
      it('return move definition', () => {
        var gold = new Gold({ type: 'G' });
        gold.moveDef().should.eql({
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

    context('white', () => {
      it('return move definition', () => {
        var gold = new Gold({ type: 'g' });
        gold.moveDef().should.eql({
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

  describe('#imageFileName', () => {
    context('black', () => {
      it('return `Skin.png`', () => {
        var gold = new Gold({ type: 'G' });
        gold.imageFileName().should.eql('Skin.png');
      });
    });

    context('white', () => {
      it('return `Gkin.png`', () => {
        var gold = new Gold({ type: 'g' });
        gold.imageFileName().should.eql('Gkin.png');
      });
    });
  });


  describe('#toOpponentPiece', () => {
    context('black', () => {
      it('return opponent piece', () => {
        const gold = new Gold({ type: 'G' });
        gold.toOpponentPiece().type.should.eql('g');
      });
    });

    context('white', () => {
      it('return opponent piece', () => {
        const gold = new Gold({ type: 'g' });
        gold.toOpponentPiece().type.should.eql('G');
      });
    });
  });
});
