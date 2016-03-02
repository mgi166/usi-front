import Shogi from '../src/shogi';

const InitialState = {
  board: Shogi.Board.board,
  isHoldingPiece: undefined
};

const ShogiReducer = (state = InitialState, action) => {
  switch (action.type) {
  case 'HOLD_PIECE':
    // if same piece click, release piece.
    if (state.isHoldingPiece && state.isHoldingPiece.equals(action.piece)) {
      return Object.assign({}, state, { isHoldingPiece: undefined });
    }

    return Object.assign({}, state, { isHoldingPiece: action.piece });
  default:
    return state;
  }
};

export default ShogiReducer;
