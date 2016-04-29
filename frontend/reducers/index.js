import Shogi from '../src/shogi';
import * as CONST from '../constants/actionTypes';

const InitialState = {
  board: Shogi.Board,
  isHoldingPiece: undefined
};

const ShogiReducer = (state = InitialState, action) => {
  switch (action.type) {
  case CONST.MOVE_PIECE:
    // if empty piece click when no holding piece, do nothing.
    if (action.piece.type === '*' && typeof state.isHoldingPiece === 'undefined' ) {
      return state;
    }

    // if same piece click, release piece.
    if (state.isHoldingPiece) {
      if (state.isHoldingPiece.equals(action.piece)) {
        return Object.assign({}, state, { isHoldingPiece: undefined });
      }

      var newBoard = state.board.movePiece(state.isHoldingPiece, action.piece);

      return Object.assign({}, { board: newBoard }, { isHoldingPiece: undefined });
    } else {
      return Object.assign({}, state, { isHoldingPiece: action.piece });
    }
  default:
    return state;
  }
};

export default ShogiReducer;
