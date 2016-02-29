import React from 'react';
import boardImage from "../images/shogi_board/ban_kaya_d.png";
import Piece from './piece';
import Shogi from '../src/shogi';
import store from '../stores/index';

export default class Board extends React.Component {
  render() {
    var tbody = store.getState().board.map((row, y) => {
      var rows = row.map((piece, x) => {
        return(
          <td key={x}>
            <Piece piece={piece} onClick={() => { store.dispatch({type: 'HOLD_PIECE', x: x, y: y }); }}/>
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
