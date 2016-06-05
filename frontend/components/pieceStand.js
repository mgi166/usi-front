import React from 'react';
import { getPieceImage } from '../images/shogiPieces/index';

const PieceStand = ({ pieceStand }) => {
  const tr = pieceStand.map((piece) => {
    return (
      <tr>
        <td>
          <img src={getPieceImage(piece)}></img>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <table>
        <tbody>
          {tr}
        </tbody>
      </table>
    </div>
  );
};

export default PieceStand;
