import React from 'react';
import { connect } from 'react-redux';
import promoteModalComponent from '../../components/modals/promoteModal';

const mapStateToProps = (state) => {
  return { open: state.open };
};

// TODO: emit promote actions
// const mapDispatchToProps = (dispatch) => {
//   return {
//     // handlePromote: undefined,
//     // handleNoPromote: undefined
//   };
// };

const PromoteModal = connect(
  mapStateToProps
//  mapDispatchToProps
)(promoteModalComponent);

export default PromoteModal;
