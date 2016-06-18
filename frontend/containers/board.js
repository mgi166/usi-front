import React from 'react';
import { connect } from 'react-redux';
import board from '../components/board';
import { hidePromoteModal, promotePiece } from '../actions';

const mapStateToProps = (state) => {
  return { board: state.shogi.board.board, open: state.promoteModal.open };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onHidePromoteModal: () => { dispatch(hidePromoteModal()); },
    promotePiece: (piece) => { dispatch(promotePiece(piece)); }
  };
};

const Board = connect(
  mapStateToProps,
  mapDispatchToProps
)(board);

export default Board;
