import React from 'react';
import { connect } from 'react-redux';
import pieceStand from './pieceStand';

const mapStateToProps = (state) => {
  return { pieceStand: state.whitePieceStand };
};

const WhitePieceStand = connect(
  mapStateToProps
)(pieceStand);

export default WhitePieceStand;
