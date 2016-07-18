import React from 'react';
import Styles from '../styles/board.css';
import PromoteModal from '../containers/modals/promoteModal';
import Piece from '../containers/piece';

const Board = ({ board }) => {
  const tbody = board.map((row, y) => {
    const rows = row.map((piece, x) => {
      const style = {
        backgroundColor: (piece.movable || piece.isDrop) ? "#A1C4D9" : "#EDBA63",
      };

      return (
        <td key={x} style={style} className="board">
          <Piece piece={piece} />
        </td>
      );
    });
    return(<tr key={y} className="board">{rows}</tr>);
  });

  return (
    <div>
      <PromoteModal />
      <table className="board" style={{backgroundColor: 'black'}}>
        <tbody>{tbody}</tbody>
      </table>
    </div>
  );
};

export default Board;
