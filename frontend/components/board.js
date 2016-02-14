import React from 'react';
import boardImage from "../images/shogi_board/ban_kaya_d.png";
import Piece from './piece';
import Shogi from '../src/shogi';
import store from '../stores/index';

export default class Board extends React.Component {

  constructor(props) {
    super(props);
    this.board = [
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
  }

  render() {
    var board = this.board;
    var tbody = board.map((row, y) => {
      var yCor = y + 1;
      var rows = row.map((piece, x) => {
        var xCor = 10 - x - 1;
        return(
          <td key={x}>
            <Piece type={piece} x={x} y={y} onClick={() => { store.dispatch({type: 'HOLD_PIECE', x: x, y: y }); }}/>
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
