import Shogi from '../src/shogi';
import * as CONST from '../constants/actionTypes';

const InitialState = {
  board: Shogi.Board,
  isHoldingPiece: undefined,
  blackPieceStand: [],
  whitePieceStand: [],
  promoteModal: false
};

const ShogiReducer = (state = InitialState, action) => {
  switch (action.type) {
  case CONST.HOLD_PIECE:
    if (action.piece.type == '*') {
      return state;
    } else {
      let newBoard = state.board.enhanceMovablePoint(action.piece);
      return Object.assign(
        {},
        state,
        {
          board: newBoard,
          blackPieceStand: state.blackPieceStand,
          whitePieceStand: state.whitePieceStand,
          isHoldingPiece: action.piece
        }
      );
    }
  case CONST.MOVE_PIECE:
    // if same piece click, release piece.
    if (state.isHoldingPiece) {
      let newBoard = state.board.movePiece(state.isHoldingPiece, action.piece);

      if (newBoard.takedPiece) {
        const takedPiece = newBoard.takedPiece;
        // TODO: Use constants. Refactor.
        switch (newBoard.takedPiece.team()) {
        case 'white':
          return Object.assign(
            {},
            state,
            {
              board: newBoard,
              isHoldingPiece: undefined,
              blackPieceStand: state.blackPieceStand.concat([takedPiece.toOpponentPiece()]),
              whitePieceStand: state.whitePieceStand
            }
          );
        case 'black':
          return Object.assign(
            {},
            state,
            {
              board: newBoard,
              isHoldingPiece: undefined,
              blackPieceStand: state.blackPieceStand,
              whitePieceStand: state.whitePieceStand.concat([takedPiece.toOpponentPiece()])
            }
          );
        }
      } else {
        return Object.assign(
          {},
          state,
          {
            board: newBoard,
            isHoldingPiece: undefined,
            blackPieceStand: state.blackPieceStand,
            whitePieceStand: state.whitePieceStand
          }
        );
      }
    } else {
      return Object.assign({}, state, { isHoldingPiece: action.piece });
    }
  case CONST.SHOW_PROMOTE_MODAL:
    return Object.assign({}, state, { promoteModal: true });
  case CONST.HIDE_PROMOTE_MODAL:
    return Object.assign({}, state, { promoteModal: false });
  default:
    return state;
  }
};

export default ShogiReducer;
