import { combineReducers } from 'redux';
import shogi from './shogi';
import promoteModal from './promoteModal';

export default combineReducers(
  { shogi, promoteModal }
);
