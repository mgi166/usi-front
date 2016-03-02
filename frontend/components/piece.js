import React from 'react';
import { holdPiece } from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    turn: state.turn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPieceClick: (piece) => {
      dispatch(holdPiece(piece));
    }
  };
};

export default class ShogiPiece extends React.Component {
  render() {
    return(
      <div className="piece" onClick={() => this.props.onPieceClick(this.props.piece)}>
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
