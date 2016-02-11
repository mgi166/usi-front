import { createStore } from 'redux';
import changeTurn from './reducers';

let store = createStore(changeTurn);
