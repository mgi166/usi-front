import React from 'react';
import { connect } from 'react-redux';
import board from '../components/board';

const mapStateToProps = (state) => {
  return { board: state.board.board, promoteModal: state.promoteModal };
};

const Board = connect(
  mapStateToProps
)(board);

export default Board;
