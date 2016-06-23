import React from 'react';
import { connect } from 'react-redux';
import pieceComponent from '../components/piece';
import { holdPiece, enhanceCanDropPosition } from '../actions';
import store from '../stores/index';

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPieceClick: (piece) => {
      const state = store.getState();
      const board = state.shogi.board();

      const holdingPiece = state.shogi.holdingPiece;

      if (!holdingPiece) {
        // FIX: holdingPiece equals piece. It's confusing.
        dispatch(holdPiece(piece));
        dispatch(enhanceCanDropPosition(piece));
        return;
      }
    }
  };
};

const CapturedPiece = connect(
  mapStateToProps,
  mapDispatchToProps
)(pieceComponent);

export default CapturedPiece;
