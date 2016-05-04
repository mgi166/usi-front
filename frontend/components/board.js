import React from 'react';
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
        const style = {
          backgroundColor: piece.movable ? "red" : "white"
        };

        return(
          <td key={x} style={style} >
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
