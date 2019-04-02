import React, { Component } from "react";
import { connect } from "react-redux";
import ProdexGrid from "~/components/table";
import { Confirm } from "semantic-ui-react";

import {
  getUsersDataRequest,
  openEditPopup,
  deleteUser,
  handleOpenConfirmPopup,
  closeConfirmPopup,
  deleteConfirmation
} from "../../actions";

class UsersTable extends Component {
  state = {
    columns: [
      { name: "userName", title: "User Name" },
      { name: "title", title: "Title" },
      { name: "email", title: "E-mail" },
      { name: "phone", title: "Phone" },
      { name: "homeBranch", title: "Home Branch" },
      {
        name: "permissions",
        title: "Permissions",
        options: [
          { text: "Admin", value: "admin" },
          { text: "User", value: "user" }
        ]
      }
    ]
  };

  componentDidMount() {
    this.props.getUsersDataRequest();
  }

  render() {
    const {
      rows,
      filterValue,
      openEditPopup,
      confirmMessage,
      handleOpenConfirmPopup,
      closeConfirmPopup,
      deleteConfirmation
    } = this.props;

    const { columns } = this.state;

    return (
      <React.Fragment>
        <Confirm
          size="tiny"
          content="Do you really want to delete user?"
          open={confirmMessage}
          onCancel={closeConfirmPopup}
          onConfirm={deleteConfirmation}
        />
        <ProdexGrid
          filterValue={filterValue}
          columns={columns}
          rows={rows}
          rowActions={[
            { text: "Edit", callback: row => openEditPopup(row) },
            { text: "Delete", callback: row => handleOpenConfirmPopup(row.id) }
          ]}
        />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  getUsersDataRequest,
  openEditPopup,
  deleteUser,
  handleOpenConfirmPopup,
  closeConfirmPopup,
  deleteConfirmation
};

const mapStateToProps = state => {
  return {
    rows: state.settings.usersRows,
    filterValue: state.settings.filterValue,
    confirmMessage: state.settings.confirmMessage
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersTable);
