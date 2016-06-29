import _ from 'lodash';

export default class PieceStand {
  constructor () {
    this.pieceTypes = {};
  }

  add(piece) {
    // TODO: Refactor.
    if (this.pieceTypes[piece.type]) {
      this.pieceTypes[piece.type] ++;
    } else {
      this.pieceTypes[piece.type] = 1;
    }

    return piece;
  }

  clear() {
    this.pieceTypes = {};
  }

  clone() {
    const newPieceStand = new PieceStand();
    newPieceStand.pieceTypes = _.cloneDeep(this.pieceTypes);
    return newPieceStand;
  }
}
