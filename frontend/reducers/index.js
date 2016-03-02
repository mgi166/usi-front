import Shogi from '../src/shogi';

const InitialState = {
  board: Shogi.Board.board,
  isHoldingPiece: false
};

const ShogiReducer = (state = InitialState, action) => {
  return state;
};

export default ShogiReducer;
