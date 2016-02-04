import React from 'react';
import ReactDOM from 'react-dom';

class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <h1>hello</h1>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
