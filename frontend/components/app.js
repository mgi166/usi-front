import React from 'react';
import Board from '../containers/board';
import { Grid, Row, Col } from 'react-flexbox-grid';
import BlackPieceStand from '../containers/blackPieceStand';
import WhitePieceStand from '../containers/whitePieceStand';

const App = () => {
  return (
    <div className="app" style={{padding: '4em'}}>
      <Grid>
        <Row xs={12} around="xs">
          <Col>
            <WhitePieceStand />
          </Col>
          <Col>
            <Board />
          </Col>
          <Col>
            <BlackPieceStand />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default App;
