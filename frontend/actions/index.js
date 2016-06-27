import * as CONST from '../constants/actionTypes';

export function changeTurn(turn) {
  return { type: CONST.CHANGE_TURN, turn };
}

export function holdPiece(piece) {
  return { type: CONST.HOLD_PIECE, piece };
}

export function releasePiece(piece) {
  return { type: CONST.RELEASE_PIECE, piece };
}

export function enhanceMovablePoint(board, piece) {
  return { type: CONST.ENHANCE_MOVABLE_POINT, board, piece };
}

export function movePiece(board, piece) {
  return { type: CONST.MOVE_PIECE, board, piece };
}

export function addBlackPieceStand(piece) {
  return { type: CONST.ADD_BLACK_PIECE_STAND, piece };
}

export function removeBlackPieceStand(piece) {
  return { type: CONST.REMOVE_BLACK_PIECE_STAND, piece };
}

export function addWhitePieceStand(piece) {
  return { type: CONST.ADD_WHITE_PIECE_STAND, piece };
}

export function removeWhitePieceStand(piece) {
  return { type: CONST.REMOVE_WHITE_PIECE_STAND, piece };
}

export function showPromoteModal(piece) {
  return { type: CONST.SHOW_PROMOTE_MODAL, piece };
}

export function hidePromoteModal() {
  return { type: CONST.HIDE_PROMOTE_MODAL };
}

export function promotePiece(piece) {
  return { type: CONST.PROMOTE_PIECE, piece };
}

export function dropPiece(piece) {
  return { type: CONST.DROP_PIECE, piece };
}

export function enhanceCanDropPosition(piece) {
  return { type: CONST.ENHANCE_CAN_DROP_POSITION, piece };
}
