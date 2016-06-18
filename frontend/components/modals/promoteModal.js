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

  closeModal() {
    this.props.hidePromoteModal();
  }

  promotePiece() {
    this.props.promotePiece();
    this.closeModal();
  }

  notPromotePiece() {
    this.closeModal();
  }

  render() {
    const actions = [
      <FlatButton label="No" primary={true} onTouchTap={this.notPromotePiece.bind(this)} />,
      <FlatButton label="Yes" primary={true} onTouchTap={this.promotePiece.bind(this)} />
    ];

    return (
      <div>
        <Dialog title="" actions={actions} modal={true} open={this.props.open} />
      </div>
    );
  }
}
