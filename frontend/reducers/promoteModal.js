import * as CONST from '../constants/actionTypes';

const initialState = { open: false };

export default function promoteModal(state = initialState, action) {
  switch (action.type) {
  case CONST.SHOW_PROMOTE_MODAL:
    return { open: true };
  case CONST.HIDE_PROMOTE_MODAL:
    return { open: false };
  default:
    return state;
  }
}
