import React from 'react';
import { movePiece } from '../actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getPieceImage } from '../images/shogiPieces/index';

const mapStateToProps = (state) => {
  return {
    board: state.board,
    turn: state.turn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPieceClick: (board, piece) => {
      dispatch(movePiece(board, piece));
    }
  };
};

const shogiPiece = ({ piece, board, onPieceClick }) => {
  return (
    <div className="piece" onClick={() => onPieceClick(board, piece)}>
      <img src={getPieceImage(piece)}></img>
    </div>
  );
};

const Piece = connect(
  mapStateToProps,
  mapDispatchToProps
)(shogiPiece);

export default Piece;
