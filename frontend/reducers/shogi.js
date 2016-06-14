import * as CONST from '../constants/actionTypes';
import Shogi from '../src/shogi';

const initialState = {
  holdingPiece: undefined,
  board: Shogi.Board,
  blackPieceStand: [],
  whitePieceStand: []
};

export default function shogi(state = initialState, action) {
  switch (action.type) {
  case CONST.HOLD_PIECE:
    if (action.piece.isEmpty()) return state;
    let newBoard = state.board.enhanceMovablePoint(action.piece);

    return Object.assign(
      {},
      state,
      {
        board: newBoard,
        isHoldingPiece: action.piece
      }
    );
  case CONST.MOVE_PIECE:
    // if same piece click, release piece.
    if (state.isHoldingPiece) {
      let newBoard = state.board.movePiece(state.isHoldingPiece, action.piece);

      if (newBoard.takedPiece) {
        const takedPiece = newBoard.takedPiece;
        // TODO: Use constants. Refactor.
        switch (newBoard.takedPiece.team()) {
        case 'white':
          return Object.assign(
            {},
            state,
            {
              board: newBoard,
              isHoldingPiece: undefined,
              blackPieceStand: state.blackPieceStand.concat([takedPiece.toOpponentPiece()])
            }
          );
        case 'black':
          return Object.assign(
            {},
            state,
            {
              board: newBoard,
              isHoldingPiece: undefined,
              whitePieceStand: state.whitePieceStand.concat([takedPiece.toOpponentPiece()])
            }
          );
        }
      } else {
        return Object.assign(
          {},
          state,
          {
            board: newBoard,
            isHoldingPiece: undefined
          }
        );
      }
    } else {
      return Object.assign({}, state, { isHoldingPiece: action.piece });
    }
  default:
    return state;
  }
}
