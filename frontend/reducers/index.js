import { combineReducers } from 'redux';

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
  changeTurn,
  holdPiece
});

export default Shogi;
