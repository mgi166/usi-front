import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/game';

class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>hello</h1>
        <Game />
      </div>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
