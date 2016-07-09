import React from 'react';
import { getPieceImage } from '../images/shogiPieces/index';

const Piece = ({ piece, onPieceClick }) => {
  return (
    <div className="piece" onClick={() => onPieceClick(piece)}>
      <img src={getPieceImage(piece)}></img>
    </div>
  );
};

export default Piece;
