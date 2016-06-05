import React from 'react';
import { connect } from 'react-redux';
import PieceStand from './pieceStand';

const mapStateToProps = (state) => {
  return { pieceStand: state.blackPieceStand };
};

const BlackPieceStand = connect(
  mapStateToProps
)(PieceStand);

export default BlackPieceStand;
