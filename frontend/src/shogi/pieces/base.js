import _ from 'lodash';
import * as CONST from '../constants/pieceTypes';

export default class Base {
  constructor({ type, x, y, movable = false, isPlaced =  false }) {
    this.type = type;
    this.movable = movable;
    this.isPlaced = isPlaced;
    this.x = x;
    this.y = y;
  }

  equals(piece) {
    return (
      this.type === piece.type &&
      this.movable === piece.movable &&
      this.x === piece.x &&
      this.y === piece.y
    );
  }

  isBlack(piece = this) {
    return this.isUsiBlack(piece);
  }

  isWhite(piece = this) {
    return this.isUsiWhite(piece);
  }

  team() {
    if (this.isBlack()) {
      return CONST.USI_BLACK_TEAM;
    } else if (this.isWhite()) {
      return CONST.USI_WHITE_TEAM;
    } else {
      return undefined;
    }
  }

  isOwnTeam(piece) {
    if (this.team() === CONST.USI_BLACK_TEAM) {
      return this.isUsiBlack(piece);
    } else if (this.team() === CONST.USI_WHITE_TEAM) {
      return this.isUsiWhite(piece);
    } else {
      return false;
    }
  }

  isUsiBlack(piece) {
    return _.includes(CONST.USI_BLACK_PIECES, piece.type);
  }

  isUsiWhite(piece) {
    return _.includes(CONST.USI_WHITE_PIECES, piece.type);
  }
}