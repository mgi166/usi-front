import React from 'react';
import { movePiece, holdPiece } from '../actions';
import { connect } from 'react-redux';
import store from '../stores/index';
import pieceComponent from '../components/piece';

const mapStateToProps = (state) => {
  return {
    board: state.board,
    turn: state.turn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPieceClick: (board, piece) => {
      const state = store.getState();
      const actionCreator = state.isHoldingPiece ? movePiece : holdPiece;
      dispatch(actionCreator(board, piece));
    }
  };
};

const Piece = connect(
  mapStateToProps,
  mapDispatchToProps
)(pieceComponent);

export default Piece;
