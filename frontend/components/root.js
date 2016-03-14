import React from 'react';
import Game from './game';
import DevTools from './dev_tools';
import { connect } from 'redux';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import store from '../stores/index';

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <DevTools />
          <h1>hello</h1>
          <Game />
        </div>
      </Provider>
    );
  }
}
