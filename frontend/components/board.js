import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Styles from '../styles/board.css';
import PromoteModal from '../containers/modals/promoteModal';
import Piece from '../containers/piece';
import BlackPieceStand from '../containers/blackPieceStand';
import WhitePieceStand from '../containers/whitePieceStand';

const Board = ({ board }) => {
  const tbody = board.map((row, y) => {
    const rows = row.map((piece, x) => {
      const style = {
        backgroundColor: (piece.movable || piece.isDrop) ? "red" : "white",
      };

      return (
        <td key={x} style={style}>
          <Piece piece={piece} />
        </td>
      );
    });
    return(<tr key={y}>{rows}</tr>);
  });

  return (
    <Grid>
      <PromoteModal />
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

export default Board;
