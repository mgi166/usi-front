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
    var pieceName = _.kebabCase(this.props.piece.constructor.name);
    var destination = this.props.piece.isBlack() ? 'up' : 'down';

    return(
      <span className={`${pieceName} ${destination}`} onClick={() => this.props.onPieceClick(this.props.board, this.props.piece)}>
        {this.props.piece.type}
      </span>
    );
  }
}

const Piece = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShogiPiece);

export default Piece;
