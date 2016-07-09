import _ from 'lodash';

export default class PieceStand {
  constructor () {
    this.pieceTypes = {};
  }

  add(piece) {
    const newPieceStand = this.clone();

    newPieceStand.pieceTypes[piece.type] ?
      newPieceStand.pieceTypes[piece.type] ++ :
      newPieceStand.pieceTypes[piece.type] = 1;

    return newPieceStand;
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
