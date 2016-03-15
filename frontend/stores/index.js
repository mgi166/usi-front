import { createStore, compose } from 'redux';
import DevTools from '../components/devTools';
import Shogi from '../reducers';

let enhancer = compose(
  DevTools.instrument()
);

let store = createStore(Shogi, undefined, enhancer);

export default store;
