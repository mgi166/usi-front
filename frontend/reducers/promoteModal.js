import * as CONST from '../constants/actionTypes';

const initialState = { open: false, piece: undefined };

export default function promoteModal(state = initialState, action) {
  switch (action.type) {
  case CONST.SHOW_PROMOTE_MODAL:
    return { open: true, piece: action.piece };
  case CONST.HIDE_PROMOTE_MODAL:
    return { open: false, piece: undefined };
  default:
    return state;
  }
}
