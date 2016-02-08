import React from 'react';

export default class Piece extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: props.type,
      x: props.x,
      y: props.y
    };
  }

  render() {
    return(
      <div className="piece">
        <span>{this.state.type}</span>
      </div>
    );
  }
}
