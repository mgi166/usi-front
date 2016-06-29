import _ from 'lodash';

export default class PieceStand {
  constructor () {
    this.pieceTypes = {};
    this.pieces = new Set;
  }

  add(piece) {
    // TODO: Refactor.
    if (this.pieceTypes[piece.type]) {
      this.pieceTypes[piece.type] ++;
    } else {
      this.pieceTypes[piece.type] = 1;
    }

    this.pieces.add(piece);
    return piece;
  }

  clear() {
    this.pieceTypes = {};
    this.pieces = new Set;
  }

  clone() {
    const newPieceStand = new PieceStand();
    newPieceStand.pieceTypes = _.cloneDeep(this.pieceTypes);
    return newPieceStand;
  }
}
