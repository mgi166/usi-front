import { createStore } from 'redux';
import changeTurn from '../reducers/turn';

let store = createStore(changeTurn);
