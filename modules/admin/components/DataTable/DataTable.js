import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Confirm } from 'semantic-ui-react'
//import ProdexGrid from '~/components/table'
import ProdexTable from '~/components/table'
import {
  getDataRequest,
  openEditPopup,
  closeConfirmPopup,
  deleteConfirmation,
} from '../../actions'

class DataTable extends Component {
  componentDidMount() {
    this.props.getDataRequest(this.props.config)
  }

  render() {
    const {
      config,
      loading,
      rows,
      filterValue,
      openEditPopup,
      deleteConfirmation
    } = this.props

    const { columns } = this.props.config.display

    return (
      <React.Fragment>
        <ProdexTable
          filterValue={filterValue}
          loading={loading}
          columns={columns}
          rows={rows}
          rowActions={[
            { text: 'Edit', callback: (row) => openEditPopup(row) },
            { text: 'Delete', callback: (row) => deleteConfirmation(row.id, config) }
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  getDataRequest,
  openEditPopup,
  closeConfirmPopup,
  deleteConfirmation
}

const mapStateToProps = state => {
  let cfg = state.admin.config[state.admin.currentTab]
  return {
    config: cfg,
    rows: state.admin[cfg.api.get.dataName],
    filterValue: state.admin.filterValue,
    currentTab: state.admin.currentTab,
    loading: state.admin.loading,
    confirmMessage: state.admin.confirmMessage,
    deleteRowById: state.admin.deleteRowById,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTable)