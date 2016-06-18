import React from 'react';
import { connect } from 'react-redux';
import promoteModalComponent from '../../components/modals/promoteModal';
import { hidePromoteModal, promotePiece } from '../../actions';
import store from '../../stores/index';

const mapStateToProps = (state) => {
  return { open: state.promoteModal.open, piece: state.promoteModal.piece };
};

const mapDispatchToProps = (dispatch) => {
  return {
    promotePiece: () => {
      const piece = store.getState().promoteModal.piece;
      dispatch(promotePiece(piece));
    },
    hidePromoteModal: () => {
      dispatch(hidePromoteModal());
    }
  };
};

const PromoteModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(promoteModalComponent);

export default PromoteModal;
