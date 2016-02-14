import { createStore } from 'redux';
import Shogi from '../reducers';

let store = createStore(Shogi);

// debug
store.subscribe(
  () => console.log(store.getState())
);

export default store;
