import { createStore } from 'redux';
import changeTurn from '../reducers/turn';

const initialState = {
  turn: 'black'
};

let store = createStore(changeTurn, initialState);

export default store;
