export default function changeTurn(state, action) {
  console.log(state);
  if (state === undefined) {
    return state;
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
