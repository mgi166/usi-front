import { createStore } from 'redux';
import Shogi from '../reducers';

let store = createStore(Shogi);

export default store;
