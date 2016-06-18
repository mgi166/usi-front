import React from 'react';
import { connect } from 'react-redux';
import board from '../components/board';

const mapStateToProps = (state) => {
  return { board: state.shogi.board.board, open: state.promoteModal.open };
};

const Board = connect(
  mapStateToProps
)(board);

export default Board;
