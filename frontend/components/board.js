import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Styles from '../styles/board.css';
import PromoteModal from '../components/modals/promoteModal';
import Piece from '../containers/piece';
import BlackPieceStand from '../containers/blackPieceStand';
import WhitePieceStand from '../containers/whitePieceStand';

const Board = ({ board, open, onHidePromoteModal, promotePiece }) => {
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
      <PromoteModal open={open} onHidePromoteModal={onHidePromoteModal} promotePiece={promotePiece}/>
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
