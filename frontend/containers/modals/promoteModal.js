import React from 'react';
import { connect } from 'react-redux';
import promoteModalComponent from '../../components/modals/promoteModal';
import { hidePromoteModal, promotePiece } from '../../actions';

const mapStateToProps = (state) => {
  return { open: state.promoteModal.open };
};

const mapDispatchToProps = (dispatch) => {
  return {
    promotePiece: (piece) => {
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
