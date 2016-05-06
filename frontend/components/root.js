import React from 'react';
import Game from './game';
import DevTools from './devTools';
import { connect } from 'redux';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import store from '../stores/index';

import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import AppBar from './appBar';

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
            <AppBar />
            <DevTools />
            <h1>hello</h1>
            <Game />
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}
