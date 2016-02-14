export function changeTurn(turn) {
  return { type: 'CHANGE_TURN', turn };
}

export function holdPiece(x, y) {
  return { type: 'HOLD_PIECE', x, y };
}
