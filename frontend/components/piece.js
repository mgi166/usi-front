import React from 'react';
import { movePiece } from '../actions';
import { connect } from 'react-redux';
import _ from 'lodash';

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
    var className = _.kebabCase(this.props.piece.constructor.name);
    return(
      <div className={className} onClick={() => this.props.onPieceClick(this.props.board, this.props.piece)}>
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
