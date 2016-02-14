import { combineReducers } from 'redux';

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

function changeTurn(state, action) {
  console.log(state);
  if (state === undefined) {
    return { turn: 'black' };
  }

  // TODO: fix Object.assign, return
  switch (state.turn) {
  case 'black':
    return Object.assign({}, state, { turn: 'white' });
  case 'white':
    return Object.assign({}, state, { turn: 'black' });
  default:
    return Object.assign({}, state, { turn: 'black' });
  }
}

function holdPiece(state, action) {
  console.log(state);

  if (state === undefined) {
    return { isHolded: false };
  }

  switch (state.isHolded) {
  case true:
    // no return new state
  case false:
    return Object.assign({}, state, { isHolded: true });
  default:
    return Object.assign({}, state, { isHolded: false });
  }
}

const Shogi = combineReducers({
  board,
  changeTurn,
  holdPiece
});

export default Shogi;
