import { createStore, compose } from 'redux';
import DevTools from '../components/dev_tools';
import Shogi from '../reducers';

let enhancer = compose(
  DevTools.instrument()
);

let store = createStore(Shogi, undefined, enhancer);

// debug
store.subscribe(
  () => console.log(store.getState())
);

export default store;
