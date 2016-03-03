export function changeTurn(turn) {
  return { type: 'CHANGE_TURN', turn };
}

export function holdPiece(piece) {
  return { type: 'HOLD_PIECE', piece };
}

export function movePiece(board, piece) {
  return { type: 'MOVE_PIECE', board, piece };
}
