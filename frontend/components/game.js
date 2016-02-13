import React from 'react';
import Board from './board';
import { changeTurn } from '../actions';
import store from '../stores/index';

export default class Game extends React.Component {
  render () {
    return (
        <div className="game" onClick={() => { store.dispatch({type: 'CHANGE_TURN', turn: store.getState().turn }); }}>
        <Board />
      </div>
    );
  }
}
