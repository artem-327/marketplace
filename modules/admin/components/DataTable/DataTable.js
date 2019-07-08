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
import { withDatagrid } from '~/modules/datagrid'

class DataTable extends Component {
  componentDidMount() {
    this.props.getDataRequest(this.props.config)
  }

  render() {
    const {
      config,
      loading,
      rows,
      datagrid,
      filterValue,
      openEditPopup,
      deleteConfirmation
    } = this.props

    const { tableName } = this.props.config
    const { columns } = this.props.config.display

    return (
      <React.Fragment>
        <ProdexTable
          tableName={tableName}
          {...datagrid.tableProps}
          filterValue={filterValue}
          loading={datagrid.loading || loading}
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

const mapStateToProps = (state, {datagrid}) => {
  let cfg = state.admin.config[state.admin.currentTab]
  return {
    config: cfg,
    rows: datagrid.rows,
    filterValue: state.admin.filterValue,
    currentTab: state.admin.currentTab,
    loading: state.admin.loading,
    confirmMessage: state.admin.confirmMessage,
    deleteRowById: state.admin.deleteRowById,
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(DataTable))