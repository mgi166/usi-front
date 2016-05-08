import React from 'react';
import Piece from './piece';
import { connect } from 'react-redux';
import Styles from '../styles/board.css';
import { Grid, Row, Col } from 'react-flexbox-grid';

const mapStateToProps = (state) => {
  return { board: state.board.board };
};

class ShogiBoard extends React.Component {
  render() {
    var tbody = this.props.board.map((row, y) => {
      var rows = row.map((piece, x) => {
        return (
          <Piece key={x} piece={piece} />
        );
      });
      return(<tr key={y}>{rows}</tr>);
    });

    return(
      <Grid fluid>
        <table className="board">
          <tbody>{tbody}</tbody>
        </table>
      </Grid>
    );
  }
};

const Board = connect(
  mapStateToProps
)(ShogiBoard);

export default Board;
