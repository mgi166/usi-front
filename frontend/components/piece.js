import React from 'react';
import { getPieceImage } from '../images/shogiPieces/index';

const Piece = ({ piece, board, onPieceClick }) => {
  const style = {
    backgroundColor: piece.movable ? "red" : "white"
  };

  return (
    <td className="piece" style={style} onClick={() => onPieceClick(board, piece)}>
      <img src={getPieceImage(piece)}></img>
    </td>
  );
};

export default Piece;
