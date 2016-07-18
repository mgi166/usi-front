import React from 'react';
import Board from '../containers/board';
import { Grid, Row, Col } from 'react-flexbox-grid';
import BlackPieceStand from '../containers/blackPieceStand';
import WhitePieceStand from '../containers/whitePieceStand';

const App = () => {
  return (
    <div className="app" style={{padding: '4em'}}>
      <Grid>
        <Row center="xs">
          <Col xs={1}>
            <WhitePieceStand />
          </Col>
          <Col xs={6}>
            <Board />
          </Col>
          <Col xs={1}>
            <BlackPieceStand />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default App;
