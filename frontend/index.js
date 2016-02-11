import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/game';
import { connect } from 'redux';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Store from './stores/index';

class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={Store}>
        <div>
          <h1>hello</h1>
          <Game />
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
