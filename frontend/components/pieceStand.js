import React from 'react';
import CapturedPiece from '../containers/capturedPiece';
import { getPieceImage } from '../images/shogiPieces/index';

const PieceStand = ({ pieceStand }) => {
  const tr = pieceStand.map((piece, i) => {
    return (
      <tr key={i}>
        <td>
          <CapturedPiece piece={piece} />
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
