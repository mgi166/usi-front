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

const mapDispatchToProps = (dispatch) => {
  return {
    onPieceClick: (board, piece) => {
      if (piece.isBlackPromotePlace() || piece.isWhitePromotePlace()) {
        dispatch(showPromoteModal(piece));
      }

      const state = store.getState();

      if (state.shogi.holdingPiece) {
        if (piece.equals(state.shogi.holdingPiece)) {
          dispatch(releasePiece(piece));
        } else {
          dispatch(movePiece(board, piece));

          const capturedPiece = store.getState().shogi.board.takedPiece;

          switch (capturedPiece) {
          case undefined:
            break;
          default:
            switch (capturedPiece.team()) {
            case 'black':
              dispatch(captureWhitePiece(capturedPiece));
            case 'white':
              dispatch(addBlackPieceStand(capturedPiece));
              break;
            default:
              break;
            }
          }
        }
      } else {
        dispatch(holdPiece(piece));
        dispatch(enhanceMovablePoint(board, piece));
      }
    }
  };
};

const Piece = connect(
  mapStateToProps,
  mapDispatchToProps
)(pieceComponent);

export default Piece;
