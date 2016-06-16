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

  promote() {
    throw new Error('Implement this method in subclass');
  }

  unpromote() {
    throw new Error('Implement this method in subclass');
  }

  isPromoted() {
    throw new Error('Implement this method in subclass');
  }

  moveDef() {
    throw new Error('Implement this method in subclass');
  }

  toOpponentPiece() {
    throw new Error('Implement this method in subclass');
  }

  equals(piece) {
    return (
      this.type === piece.type &&
      this.movable === piece.movable &&
      this.x === piece.x &&
      this.y === piece.y
    );
  }

  isBlackPromotePlace() {
    if (this.isWhite()) return false;
    if (this.isPromoted()) return false;

    switch (this.y) {
    case 1:
    case 2:
    case 3:
      return true;
    default:
      return false;
    }
  }

  isWhitePromotePlace() {
    if (this.isBlack()) return false;
    if (this.isPromoted()) return false;

    switch (this.y) {
    case 7:
    case 8:
    case 9:
      return true;
    default:
      return false;
    }
  }

  isBlack(piece = this) {
    return this.isUsiBlack(piece);
  }

  isWhite(piece = this) {
    return this.isUsiWhite(piece);
  }

  isEmpty() {
    return false;
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

  clearPositonalAttrs() {
    this.movable = undefined;
    this.isPlaced = undefined;
    this.x = undefined;
    this.y = undefined;
  }

  imageFileName() {
    var fileName = CONST.PIECE_TYPE_TO_IMAGE_FILE_MAP[this.type];
    if (!fileName) { return undefined; };

    switch (this.isBlack()) {
    case true:
      return `${CONST.IMAGE_UPSIDE_PREFIX}${CONST.PIECE_TYPE_TO_IMAGE_FILE_MAP[this.type]}.png`;
    case false:
      return `${CONST.IMAGE_DOWNSIDE_PREFIX}${CONST.PIECE_TYPE_TO_IMAGE_FILE_MAP[this.type]}.png`;
    }
  }
}
