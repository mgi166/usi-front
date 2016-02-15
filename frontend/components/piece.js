import React from 'react';
import { connect } from 'react-redux';

// const ShogiPiece = ({ type, onPieceClick }) => {
//   return (
//     <div className="piece" onClick={() => onPieceClick()}>
//       <span>{type}</span>
//     </div>
//   );
// };

const mapStateToProps = (state) => {
  return {
    type: state.turn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPieceClick: () => {
    }
  };
};

//export default Piece;

// export default class Piece extends React.Component {
//   render() {
//     return(
//       <div className="piece">
//         <span>{this.props.type}</span>
//       </div>
//     );
//   }
// }

export default class ShogiPiece extends React.Component {
  render() {
    return(
      <div className="piece" onClick={() => this.props.onPieceClick()}>
        <span>{this.props.type}</span>
      </div>
    );
  }
}

const Piece = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShogiPiece);

export default Piece;
