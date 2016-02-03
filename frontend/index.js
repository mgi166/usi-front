import React from 'react';
import ReactDOM from 'react-dom';

class Box extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <h1>hello</h1>
    );
  }
}

ReactDOM.render(<Box />, document.getElementById('root'));
