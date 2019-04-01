import React, { Component } from "react";
import { connect } from "react-redux";

import { Button, Modal } from "semantic-ui-react";
import { closeConfirmPopup, deleteUser } from "../../actions";

class ConfirmDeleteUsersPopup extends Component {
  render() {
    return (
      <Modal open centered={false}>
        <Modal.Header>Confirm delete user</Modal.Header>
        <Modal.Content>
          <p>Do you really want to delete user?</p>
          <Modal.Actions>
            <Button
              content="Delete"
              basic
              onClick={() => this.props.deleteUser(this.props.userid)}
            />
            <Button color="blue" onClick={this.props.closeConfirmPopup}>
              Cancel
            </Button>
          </Modal.Actions>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = props => {
  return {
    userid: props.settings.deleteUserById
  };
};
const mapDispatchToProps = {
  closeConfirmPopup,
  deleteUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmDeleteUsersPopup);
