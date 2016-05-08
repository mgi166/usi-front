import React from 'react';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import Container from './container';

const Mui = () => {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Container />
    </MuiThemeProvider>
  );
};

export default Mui;
