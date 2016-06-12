import Shogi from '../src/shogi';
import * as CONST from '../constants/actionTypes';

const InitialState = {
  board: Shogi.Board,
  isHoldingPiece: undefined,
  blackPieceStand: [],
  whitePieceStand: []
};

const ShogiReducer = (state = InitialState, action) => {
  switch (action.type) {
  case CONST.HOLD_PIECE:
    if (action.piece.type == '*') {
      return state;
    } else {
      let newBoard = state.board.enhanceMovablePoint(action.piece);
      return Object.assign(
        {},
        {
          board: newBoard,
          blackPieceStand: state.blackPieceStand,
          whitePieceStand: state.whitePieceStand,
          isHoldingPiece: action.piece
        }
      );
    }
  case CONST.MOVE_PIECE:
    // if same piece click, release piece.
    if (state.isHoldingPiece) {
      let newBoard = state.board.movePiece(state.isHoldingPiece, action.piece);

      if (newBoard.takedPiece) {
        const opponentPiece = newBoard.takedPiece.toOpponentPiece();
        // TODO: Use constants. Refactor.
        switch (newBoard.takedPiece.team()) {
        case 'white':
          return Object.assign(
            {},
            { board: newBoard, whitePieceStand: state.whitePieceStand },
            {
              isHoldingPiece: undefined,
              blackPieceStand: state.blackPieceStand.concat([opponentPiece])
            }
          );
        case 'black':
          return Object.assign(
            {},
            { board: newBoard, blackPieceStand: state.blackPieceStand },
            {
              isHoldingPiece: undefined,
              whitePieceStand: state.whitePieceStand.concat([opponentPiece])
            }
          );
        }
      } else {
        return Object.assign(
          {},
          {
            board: newBoard,
            blackPieceStand: state.blackPieceStand,
            whitePieceStand: state.whitePieceStand
          },
          { isHoldingPiece: undefined }
        );
      }
    } else {
      return Object.assign({}, state, { isHoldingPiece: action.piece });
    }
  default:
    return state;
  }
};

export default ShogiReducer;
