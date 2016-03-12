import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/game';
import DevTools from './components/dev_tools';
import { connect } from 'redux';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import store from './stores/index';

class Root extends React.Component {
  constructor(props) {
    super(props);
  }

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

ReactDOM.render(<Root />, document.getElementById('root'));
