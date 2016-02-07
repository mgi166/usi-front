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
      var yCor = y + 1;
      var rows = row.map((piece, x) => {
        var xCor = 10 - x - 1;
        return(<td key={x}>{xCor},{yCor}</td>);
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
