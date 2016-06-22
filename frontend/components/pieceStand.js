import React from 'react';
import Piece from '../containers/piece';
import { getPieceImage } from '../images/shogiPieces/index';

const PieceStand = ({ pieceStand }) => {
  const tr = pieceStand.map((piece, i) => {
    return (
      <tr key={i}>
        <td>
          <Piece piece={piece} />
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
