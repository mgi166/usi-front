import React from 'react';
import boardImage from "../images/shogi_board/ban_kaya_d.png";

export default class Board extends React.Component {
  constructor(props) {
    super(props);

    var board = [];

    for (var i = 1; i <= 9; i++) {
      board.push(['', '', '', '', '', '', '', '', '']);
    }

    this.state = { board: board };
  }

  render() {
    var tbody = this.state.board.map((row, y) => {
      var rows = row.map((piece, x) => {
        return(<td key={x}>{x + 1},{y + 1}</td>);
      });
      return(<tr key={y}>{rows}</tr>);
    });

    return(
      <table className="board" background={boardImage}>
        <tbody>{tbody}</tbody>
      </table>
    );
  }
}
