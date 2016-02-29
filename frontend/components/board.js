import React from 'react';
import boardImage from "../images/shogi_board/ban_kaya_d.png";
import Piece from './piece';
import { connect } from 'react-redux';
import { holdPiece } from '../actions';

const mapStateToProps = (state) => {
  return { board: state.board };
};

const mapDispatchToProps = (dispatch) => {
  return (
    {
      onBoardClick: (piece) => {
        return dispatch(holdPiece(piece));
      }
    }
  );
};

export default class ShogiBoard extends React.Component {
  render() {
    var tbody = this.props.board.map((row, y) => {
      var rows = row.map((piece, x) => {
        return(
          <td key={x}>
            <Piece piece={piece} onClick={this.props.onBoardClick()}/>
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
