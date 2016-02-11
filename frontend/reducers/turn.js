export default function changeTurn(state, action) {
  var turn = state.turn;

  if (turn == 'black') {
    return Object.assign({}, state, { turn: 'white' });
  } else {
    return Object.assign({}, state, { turn: 'black' });
  }
}
