import Shogi from '../src/shogi';

const InitialState = {
  board: Shogi.Board,
  isHoldingPiece: undefined
};

const ShogiReducer = (state = InitialState, action) => {
  switch (action.type) {
  case 'MOVE_PIECE':
    // if empty piece click when no holding piece, do nothing.
    if (action.piece.type === '*' && typeof state.isHoldingPiece === 'undefined' ) {
      return state;
    }

    // if same piece click, release piece.
    if (state.isHoldingPiece) {
      if (state.isHoldingPiece.equals(action.piece)) {
        return Object.assign({}, state, { isHoldingPiece: undefined });
      }

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
