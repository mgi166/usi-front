import React from 'react';
import boardImage from "../images/shogi_board/ban_kaya_d.png";
import Piece from './piece';
import Shogi from '../src/shogi';

export default class Board extends React.Component {
  constructor(props) {
    super(props);

    var board = [
      ['l', 'n', 's', 'g', 'k', 'g', 's', 'n', 'l'],
      ['*', 'b', '*', '*', '*', '*', '*', 'r', '*'],
      ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
      ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
      ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
      ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      ['*', 'B', '*', '*', '*', '*', '*', 'R', '*'],
      ['L', 'N', 'S', 'G', 'K', 'G', 'S', 'N', 'L']
    ];

    this.state = { board: board };
  }

  render() {
    var tbody = this.state.board.map((row, y) => {
      var yCor = y + 1;
      var rows = row.map((piece, x) => {
        var xCor = 10 - x - 1;
        return(
          <td key={x}>
            <Piece type={piece} x={x} y={y} />
          </td>
        );
      });
      return(<tr key={y}>{rows}</tr>);
    });

    return(
      <div>
        <table className="board" background={boardImage}>
          <tbody>{tbody}</tbody>
        </table>
      </div>
    );
  }
}
