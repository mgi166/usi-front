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
        // TODO: Use constants. Refactor.
        switch (newBoard.takedPiece.team()) {
        case 'black':
          state.blackPieceStand.push(newBoard.takedPiece);
          return Object.assign(
            {},
            { board: newBoard, whitePieceStand: state.whitePieceStand },
            {
              isHoldingPiece: undefined,
              blackPieceStand: state.blackPieceStand
            }
          );
        case 'white':
          state.whitePieceStand.push(newBoard.takedPiece);
          return Object.assign(
            {},
            { board: newBoard, blackPieceStand: state.blackPieceStand },
            {
              isHoldingPiece: undefined,
              whitePieceStand: state.whitePieceStand
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
