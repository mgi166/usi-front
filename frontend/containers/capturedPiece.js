import React from 'react';
import { connect } from 'react-redux';
import pieceComponent from '../components/piece';
import store from '../stores/index';

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPieceClick: (piece) => {
    }
  };
};

const CapturedPiece = connect(
  mapStateToProps,
  mapDispatchToProps
)(pieceComponent);

export default CapturedPiece;
