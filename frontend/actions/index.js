import * as CONST from '../constants/actionTypes';

export function changeTurn(turn) {
  return { type: CONST.CHANGE_TURN, turn };
}

export function holdPiece(piece) {
  return { type: CONST.HOLD_PIECE, piece };
}

export function enhanceMovablePoint(board, piece) {
  return { type: CONST.ENHANCE_MOVABLE_POINT, board, piece };
}

export function movePiece(board, piece) {
  return { type: CONST.MOVE_PIECE, board, piece };
}

export function showPromoteModal() {
  return { type: CONST.SHOW_PROMOTE_MODAL };
}

export function hidePromoteModal() {
  return { type: CONST.HIDE_PROMOTE_MODAL };
}
