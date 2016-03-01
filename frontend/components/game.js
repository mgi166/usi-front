import React from 'react';
import Board from './board';
import { changeTurn } from '../actions';
import { connect } from 'react-redux';

export default class ShogiGame extends React.Component {
  render () {
    return (
      <div className="game">
        <Board />
      </div>
    );
  }
}

const Game = connect()(ShogiGame);

export default Game;
