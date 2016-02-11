export default function changeTurn(state, action) {
  if (state == 'black') {
    return Object.assign({}, state, { turn: 'white' });
  } else {
    return Object.assign({}, state, { turn: 'black' });
  }
}
