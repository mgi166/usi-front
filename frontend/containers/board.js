import React from 'react';
import { connect } from 'react-redux';
import board from '../components/board';
import { hidePromoteModal } from '../actions';

const mapStateToProps = (state) => {
  return { board: state.shogi.board.board, open: state.promoteModal.open };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onHidePromoteModal: () => { dispatch(hidePromoteModal()); }
  };
};

const Board = connect(
  mapStateToProps,
  mapDispatchToProps
)(board);

export default Board;
