import React, { Component } from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

// NOTE: For emit `onTouchTap` event.
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class PromoteModal extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onTouchTap={this.handleClose.bind(this)} />,
      <FlatButton label="Submit" primary={true} onTouchTap={this.handleClose.bind(this)} />
    ];

    return (
      <div>
        <RaisedButton label="Modal" onTouchTap={this.handleOpen.bind(this)} />
        <Dialog title="" actions={actions} modal={true} open={this.state.open} />
      </div>
    );
  }
}
