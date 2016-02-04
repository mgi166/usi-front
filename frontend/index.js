import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/board';

class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>hello</h1>
        <Board />
      </div>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
