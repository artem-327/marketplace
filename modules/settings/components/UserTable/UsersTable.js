import React, { Component } from "react"
import { connect } from "react-redux"
import { Confirm } from "semantic-ui-react"

import ProdexGrid from "~/components/table"
import { TablePopUp } from "~/components/tablePopup"

import {
  getUsersDataRequest,
  openPopup,
  handleOpenConfirmPopup,
  closeConfirmPopup,
  deleteConfirmation,
  openRolesPopup
} from "../../actions"
import Router from "next/router"

class UsersTable extends Component {
  state = {
    columns: [
      { name: "name", title: "User" },
      { name: "title", title: "Job Title" },
      { name: "email", title: "E-mail" },
      { name: "phone", title: "Phone" },
      { name: "homeBranch", title: "Home Branch" },
      { name: "allUserRoles", title: "Roles", width: 200 }
    ]
  }

  componentDidMount() {
    this.props.getUsersDataRequest()
  }

  render() {
    const {
      rows,
      filterValue,
      loading,
      openPopup,
      openRolesPopup,
      confirmMessage,
      handleOpenConfirmPopup,
      closeConfirmPopup,
      deleteConfirmation,
      deleteRowById,
      currentTab
    } = this.props

    const { columns } = this.state

    return (
      <React.Fragment>
        <Confirm
          size="tiny"
          content="Do you really want to delete user?"
          open={confirmMessage}
          onCancel={closeConfirmPopup}
          onConfirm={() => deleteConfirmation(deleteRowById, currentTab)}
        />
        <ProdexGrid
          filterValue={filterValue}
          columns={columns}
          rows={rows}
          loading={loading}
          style={{ marginTop: "5px" }}
          rowActions={[
            { text: "Edit", callback: row => openPopup(row) },
            { text: "Edit Roles", callback: row => openRolesPopup(row) },
            { text: "Delete", callback: row => handleOpenConfirmPopup(row.id) }
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  getUsersDataRequest,
  openPopup,
  openRolesPopup,
  handleOpenConfirmPopup,
  closeConfirmPopup,
  deleteConfirmation
}

const mapStateToProps = state => {
  console.log('!!!!!!!!!! state.settings.usersRows', state.settings.usersRows);
  return {
    rows: state.settings.usersRows.map(r => ({
      ...r,
      allUserRoles: r.allUserRoles.map(rol => (
        rol.name
      )).join(", "),
    })),
    filterValue: state.settings.filterValue,
    confirmMessage: state.settings.confirmMessage,
    deleteRowById: state.settings.deleteRowById,
    currentTab: Router && Router.router ? state.settings.tabsNames.find(tab => tab.type === Router.router.query.type) : state.settings.tabsNames[0],
    loading: state.settings.loading,
    roles: state.settings.roles
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersTable)
