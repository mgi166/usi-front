import React from 'react';
import { movePiece } from '../actions';
import { connect } from 'react-redux';

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

export default class ShogiPiece extends React.Component {
  render() {
    return(
      <div className="piece" onClick={() => this.props.onPieceClick(this.props.board, this.props.piece)}>
        <span>{this.props.piece.type}</span>
      </div>
    );
  }
}

const Piece = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShogiPiece);

export default Piece;
