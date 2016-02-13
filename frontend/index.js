import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/game';
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
          <h1>hello</h1>
          <Game />
        </div>
      </Provider>
    );
  }
}

store.dispatch({type: 'CHANGE_TURN', turn: 'black'});

ReactDOM.render(<Root />, document.getElementById('root'));
