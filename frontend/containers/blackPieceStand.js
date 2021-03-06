import React from 'react';
import { connect } from 'react-redux';
import PieceStand from '../components/pieceStand';

const mapStateToProps = (state) => {
  return { pieceStand: state.shogi.blackPieceStand };
};

const BlackPieceStand = connect(
  mapStateToProps
)(PieceStand);

export default BlackPieceStand;
