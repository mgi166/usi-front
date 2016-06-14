import _ from 'lodash';
import * as CONST from './constants/pieceTypes';
import { getClass } from './pieces/index';

export default class Piece {
  constructor({ type, x, y, movable = false, isPlaced =  false }) {
    this.type = type;
    this.movable = movable;
    this.isPlaced = isPlaced;
    this.x = x;
    this.y = y;
  }

  static create({ type, x, y, movable, isPlaced }) {
    var klass = getClass(type);
    return new klass({ type: type, x: x, y: y, movable: movable, isPlaced: isPlaced });
  }
};
