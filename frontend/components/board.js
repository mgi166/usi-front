import React from 'react';
import Piece from '../containers/piece';
import { connect } from 'react-redux';
import Styles from '../styles/board.css';
import { Grid, Row, Col } from 'react-flexbox-grid';
import BlackPieceStand from '../containers/blackPieceStand';
import WhitePieceStand from '../containers/whitePieceStand';

const mapStateToProps = (state) => {
  return { board: state.board.board };
};

const ShogiBoard = ({ board }) => {
  const tbody = board.map((row, y) => {
    const rows = row.map((piece, x) => {
      return (
          <Piece key={x} piece={piece} />
      );
    });
    return(<tr key={y}>{rows}</tr>);
  });

  return (
    <Grid>
      <Row center="xs">
        <Col xs={1}>
          <WhitePieceStand />
        </Col>
        <Col xs={6}>
          <table className="board">
            <tbody>{tbody}</tbody>
          </table>
        </Col>
        <Col xs={1}>
          <BlackPieceStand />
        </Col>
      </Row>
    </Grid>
  );
};

const Board = connect(
  mapStateToProps
)(ShogiBoard);

export default Board;
