import { combineReducers } from 'redux';
import Shogi from '../src/shogi';

function board(state, action) {
  // initial state
  if (state === undefined) {
    return(
      [
        ['l', 'n', 's', 'g', 'k', 'g', 's', 'n', 'l'],
        ['*', 'b', '*', '*', '*', '*', '*', 'r', '*'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
        ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
        ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['*', 'B', '*', '*', '*', '*', '*', 'R', '*'],
        ['L', 'N', 'S', 'G', 'K', 'G', 'S', 'N', 'L']
      ]
    );
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
  switch (state) {
  case true:
    // no return new state
  case false:
    return true;
  default:
    return false;
  }
}

const ShogiReducer = combineReducers({
  board,
  turn,
  isHolded
});

export default ShogiReducer;
