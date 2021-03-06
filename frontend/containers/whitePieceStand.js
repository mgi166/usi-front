import React from 'react';
import { connect } from 'react-redux';
import pieceStand from '../components/pieceStand';

const mapStateToProps = (state) => {
  return { pieceStand: state.shogi.whitePieceStand };
};

const WhitePieceStand = connect(
  mapStateToProps
)(pieceStand);

export default WhitePieceStand;
