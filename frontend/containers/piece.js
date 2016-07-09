import React from 'react';
import { movePiece, holdPiece, releasePiece, showPromoteModal, enhanceMovablePoint, addBlackPieceStand, addWhitePieceStand, dropPiece, removeBlackPieceStand, removeWhitePieceStand } from '../actions';
import { connect } from 'react-redux';
import store from '../stores/index';
import pieceComponent from '../components/piece';

const mapStateToProps = (state) => {
  return {};
};

// TODO: Refactor.
const mapDispatchToProps = (dispatch) => {
  return {
    onPieceClick: (piece) => {
      const state = store.getState();
      const holdingPiece = state.shogi.holdingPiece;

      if (!holdingPiece) {
        dispatch(holdPiece(piece));
        dispatch(enhanceMovablePoint(piece));
        return;
      }

      if (piece.equals(holdingPiece)) {
        dispatch(releasePiece(piece));
        return;
      }

      if (piece.isDrop) {
        dispatch(dropPiece(piece));

        if (holdingPiece.team() === 'white') {
          dispatch(removeWhitePieceStand(holdingPiece));
        } else if (holdingPiece.team() === 'black') {
          dispatch(removeBlackPieceStand(holdingPiece));
        }
      } else {
        dispatch(movePiece(piece));

        // NOTE: Should be FIX that holdingPiece changes x, y after movePiece action.
        if (state.shogi.holdingPiece.isPromotePlace()) {
          dispatch(showPromoteModal(holdingPiece));
        }
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
