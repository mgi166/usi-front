import React from 'react';
import boardImage from "../images/shogi_board/ban_kaya_d.png";

export default class Board extends React.Component {
  render() {
    return(
        <table className="board" background={boardImage}>
        <tbody>
        <tr>
          <td>aaa</td>
        </tr>
        </tbody>
      </table>
    );
  }
}
