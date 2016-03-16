import React from 'react';
import boardImage from "../images/shogi_board/ban_kaya_d.png";
import Piece from './piece';
import { connect } from 'react-redux';
import Styles from '../styles/board.css';

const mapStateToProps = (state) => {
  return { board: state.board.board };
};

class ShogiBoard extends React.Component {
  render() {
    var tbody = this.props.board.map((row, y) => {
      var rows = row.map((piece, x) => {
        return(
          <td key={x}>
            <Piece piece={piece} />
          </td>
        );
      });
      return(<tr key={y}>{rows}</tr>);
    });

    return(
      <div>
        <table className="board">
          <tbody>{tbody}</tbody>
        </table>
      </div>
    );
  }
};

const Board = connect(
  mapStateToProps
)(ShogiBoard);

export default Board;
