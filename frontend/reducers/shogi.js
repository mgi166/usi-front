import * as CONST from '../constants/actionTypes';
import Shogi from '../src/shogi';

const initialState = {
  holdingPiece: undefined,
  board: Shogi.Board,
  blackPieceStand: [],
  whitePieceStand: []
};

export default function shogi(state = initialState, action) {
  switch (action.type) {
  case CONST.HOLD_PIECE:
    if (action.piece.isEmpty()) return state;

    return { ...state, holdingPiece: action.piece };
  case CONST.RELEASE_PIECE:
    if (action.piece.isEmpty()) return state;

    return { ...state, board: state.board.cloneBoard().clearAttrs(), holdingPiece: undefined };
  case CONST.ENHANCE_MOVABLE_POINT:
    if (action.piece.isEmpty()) return state;

    return { ...state, board: state.board.enhanceMovablePoint(action.piece) };
  case CONST.MOVE_PIECE:
    const newBoard = state.board.movePiece(state.holdingPiece, action.piece);
    return { ...state, board: newBoard, holdingPiece: undefined };
  case CONST.ADD_BLACK_PIECE_STAND:
    return { ...state, blackPieceStand: state.blackPieceStand.concat([action.piece.toOpponentPiece()]) };
  case CONST.ADD_WHITE_PIECE_STAND:
    return { ...state, whitePieceStand: state.whitePieceStand.concat([action.piece.toOpponentPiece()]) };
  default:
    return state;
  }
}
