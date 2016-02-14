import { createStore } from 'redux';
import Shogi from '../reducers';

// const initialState = {
//   turn: 'black',
//   board: [
//     ['l', 'n', 's', 'g', 'k', 'g', 's', 'n', 'l'],
//     ['*', 'b', '*', '*', '*', '*', '*', 'r', '*'],
//     ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
//     ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
//     ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
//     ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
//     ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
//     ['*', 'B', '*', '*', '*', '*', '*', 'R', '*'],
//     ['L', 'N', 'S', 'G', 'K', 'G', 'S', 'N', 'L']
//   ],
//   isHolded: false
// };

let store = createStore(Shogi);

export default store;
