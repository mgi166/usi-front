import React from 'react';
import Board from './board';

export default class Game extends React.Component {
  render () {
    return (
      <div className="game">
        <Board />
      </div>
    );
  }
}
