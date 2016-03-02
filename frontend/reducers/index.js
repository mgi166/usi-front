import { combineReducers } from 'redux';
import Shogi from '../src/shogi';

function board(state, action) {
  // initial state
  if (state === undefined) {
    return (Shogi.Board.board);
  }
  return state;
}

function turn(state, action) {
  switch (state) {
  case 'black':
    return 'white';
  case 'white':
    return 'black';
  default:
    return 'black';
  }
}

function isHolded(state, action) {
  if (state === undefined) {
    return false;
  }

  switch (action.type) {
  case 'HOLD_PIECE':
    switch (state) {
    case true:
      return false;
    case false:
      return true;
    }
  }
}

const ShogiReducer = combineReducers({
  board,
  turn,
  isHolded
});

export default ShogiReducer;
