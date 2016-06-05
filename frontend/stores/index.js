import { createStore, compose } from 'redux';
import DevTools from '../components/devTools';
import Shogi from '../reducers';

const enhancer = compose(
  DevTools.instrument()
);

const store = createStore(Shogi, undefined, enhancer);

export default store;
