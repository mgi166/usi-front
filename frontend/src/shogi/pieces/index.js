import Bishop from './bishop';
import Gold from './gold';
import King from './king';
import Knight from './knight';
import Lance from './lance';
import NullPiece from './nullPiece';
import Pawn from './pawn';
import Rook from './rook';
import Silver from './silver';
import _ from 'lodash';

const classes = {
  b: Bishop,
  g: Gold,
  k: King,
  n: Knight,
  l: Lance,
  p: Pawn,
  r: Rook,
  s: Silver
};

export function getClass(type) {
  return classes[_.lowerCase(type)] || NullPiece;
}
