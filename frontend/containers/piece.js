import React from 'react';
import { movePiece, holdPiece, showPromoteModal } from '../actions';
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
      if (piece.isBlackPromotePlace() || piece.isWhitePromotePlace()) {
        dispatch(showPromoteModal(piece));
      }

      const state = store.getState();
      const actionCreator = state.shogi.holdingPiece ? movePiece : holdPiece;
      dispatch(actionCreator(board, piece));
    }
  };
};

const Piece = connect(
  mapStateToProps,
  mapDispatchToProps
)(pieceComponent);

export default Piece;
