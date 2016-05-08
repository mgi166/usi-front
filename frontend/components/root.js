import React from 'react';
import DevTools from './devTools';
import { connect } from 'redux';
import { Provider } from 'react-redux';
import store from '../stores/index';
import Mui from './mui';

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <DevTools />
          <Mui />
        </div>
      </Provider>
    );
  }
}
