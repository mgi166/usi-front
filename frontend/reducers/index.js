import Shogi from '../src/shogi';

const InitialState = {
  board: Shogi.Board,
  isHoldingPiece: undefined
};

const ShogiReducer = (state = InitialState, action) => {
  switch (action.type) {
  case 'MOVE_PIECE':
    if (action.piece.type === '*') {
      return state;
    }

    // if same piece click, release piece.
    if (state.isHoldingPiece && state.isHoldingPiece.equals(action.piece)) {
      return Object.assign({}, state, { isHoldingPiece: undefined });
    }

    if (state.isHoldingPiece) {
      state.board.movePiece(state.isHoldingPiece, action.piece);
      return Object.assign({}, { board: state.board }, { isHoldingPiece: undefined });
    } else {
      return Object.assign({}, state, { isHoldingPiece: action.piece });
    }
  default:
    return state;
  }
};

export default ShogiReducer;
