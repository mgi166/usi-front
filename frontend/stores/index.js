import { createStore, compose } from 'redux';
import DevTools from '../components/devTools';
import Reducer from '../reducers';

const enhancer = compose(
  DevTools.instrument()
);

const store = createStore(Reducer, undefined, enhancer);

export default store;
