import React from 'react';
import { connect } from 'react-redux';
import { getChats } from '../../../../actions/actionCreator';
import DialogList from '../DialogList/DialogList';

class DialogListContainer extends React.Component {

  render() {
    const { messagesPreview, userId } = this.props;
    return <DialogList preview={messagesPreview} userId={userId} />;
  }
}

const mapStateToProps = (state) => state.chatStore;

const mapDispatchToProps = (dispatch) => ({
  getChats: () => dispatch(getChats()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogListContainer);
