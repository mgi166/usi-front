import _ from 'lodash';
import * as CONST from './constants/pieceTypes';
import { getClass } from './pieces/index';

export default class Piece {
  static create({ type, x, y, movable, isDrop, dropped }) {
    var klass = getClass(type);
    return new klass({ type: type, x: x, y: y, movable: movable, isDrop: isDrop, dropped: dropped });
  }
};
