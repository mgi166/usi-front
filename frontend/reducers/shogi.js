import * as CONST from '../constants/actionTypes';
import Shogi from '../src/shogi';
import _ from 'lodash';

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
    if (!state.holdingPiece) return state;
    const newBoard = state.board.movePiece(state.holdingPiece, action.piece);
    return { ...state, board: newBoard, holdingPiece: undefined };
  case CONST.ADD_BLACK_PIECE_STAND:
    return { ...state, blackPieceStand: state.blackPieceStand.concat([action.piece.toOpponentPiece()]) };
  case CONST.ADD_WHITE_PIECE_STAND:
    return { ...state, whitePieceStand: state.whitePieceStand.concat([action.piece.toOpponentPiece()]) };
  case CONST.PROMOTE_PIECE:
    return { ...state, board: state.board.promotePiece(action.piece) };
  case CONST.ENHANCE_CAN_DROP_POSITION:
    return { ...state, board: state.board.enhanceCanDropPosition(action.piece) };
  case CONST.DROP_PIECE:
    return { ...state, board: state.board.dropPiece(state.holdingPiece, action.piece), holdingPiece: undefined };
  case CONST.REMOVE_BLACK_PIECE_STAND:
    // TODO: refactor.
    let flag = false;
    const newBlackPieceStand = state.blackPieceStand.reduce((prev, cur, idx, res) => {
      if (flag) return prev.concat([cur]);
      if (cur.type === action.piece.type) {
        flag = true;
        return prev.concat([undefined]);
      } else {
        return prev.concat([cur]);
      }
    }, []);

    return { ...state, blackPieceStand: _.compact(newBlackPieceStand) };
  case CONST.REMOVE_WHITE_PIECE_STAND:
    // TODO: refactor.
    flag = false;
    const newWhitePieceStand = state.whitePieceStand.reduce((prev, cur, idx, res) => {
      if (flag) return prev.concat([cur]);
      if (cur.type === action.piece.type) {
        flag = true;
        return prev.concat([undefined]);
      } else {
        return prev.concat([cur]);
      }
    }, []);
    return { ...state, whitePieceStand: _.compact(newWhitePieceStand) };
  default:
    return state;
  }
}
