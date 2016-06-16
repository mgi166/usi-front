import React from 'react';
import { movePiece, holdPiece, releasePiece, showPromoteModal, enhanceMovablePoint, addBlackPieceStand, addWhitePieceStand } from '../actions';
import { connect } from 'react-redux';
import store from '../stores/index';
import pieceComponent from '../components/piece';

const mapStateToProps = (state) => {
  return {
    board: state.board,
    turn: state.turn
  };
};

// TODO: Refactor.
const mapDispatchToProps = (dispatch) => {
  return {
    onPieceClick: (board, piece) => {
      const state = store.getState();

      if (!state.shogi.holdingPiece) {
        dispatch(holdPiece(piece));
        dispatch(enhanceMovablePoint(board, piece));
        return;
      }

      if (piece.equals(state.shogi.holdingPiece)) {
        dispatch(releasePiece(piece));
        return;
      }

      // NOTE: Should be FIX that holdingPiece changes x, y after movePiece action.
      if (state.shogi.holdingPiece.isBlackPromotePlace() || state.shogi.holdingPiece.isWhitePromotePlace()) {
        dispatch(showPromoteModal(piece));
      }

      const capturedPiece = store.getState().shogi.board.capturedPiece;

      switch (capturedPiece) {
      case undefined:
        break;
      default:
        switch (capturedPiece.team()) {
        case 'black':
          dispatch(addWhitePieceStand(capturedPiece));
          break;
        case 'white':
          dispatch(addBlackPieceStand(capturedPiece));
          break;
        default:
          break;
        }
      }
    }
  };
};

const Piece = connect(
  mapStateToProps,
  mapDispatchToProps
)(pieceComponent);

export default Piece;
