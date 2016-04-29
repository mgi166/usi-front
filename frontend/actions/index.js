import * as CONST from '../constants/actionTypes';

export function changeTurn(turn) {
  return { type: CONST.CHANGE_TURN, turn };
}

export function holdPiece(piece) {
  return { type: CONST.HOLD_PIECE, piece };
}

export function movePiece(board, piece) {
  return { type: CONST.MOVE_PIECE, board, piece };
}
