import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import confirm from '~/src/components/Confirmable/confirm'
import ProdexTable from '~/components/table'
import {
  getDataRequest,
  openEditPopup,
  closeConfirmPopup,
  deleteConfirmation,
} from '../../actions'
import { withDatagrid } from '~/modules/datagrid'

class DataTable extends Component {
  render() {
    const {
      config,
      intl,
      loading,
      rows,
      datagrid,
      filterValue,
      openEditPopup,
      deleteConfirmation
    } = this.props

    const { formatMessage } = intl
    const { tableName } = this.props.config
    const { columns } = this.props.config.display
    const { addEditText, formattedMessageName } = this.props.config

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
            { text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }), callback: (row) => openEditPopup(row) },
            { text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }), callback: (row) =>
                confirm(
                  formatMessage({ id: `confirm.delete${formattedMessageName.charAt(0).toUpperCase() + formattedMessageName.slice(1)}.title`, defaultMessage: `Delete ${addEditText}` }),
                  formatMessage(
                    { id: `confirm.delete${formattedMessageName.charAt(0).toUpperCase() + formattedMessageName.slice(1)}.content`, defaultMessage: `Do you really want to delete '${row.name}' ${formattedMessageName}?` },
                    { name: row.name })
                ).then(() => deleteConfirmation(row.id, config)) }
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
  let cfg = state.admin.config[state.admin.currentTab.name]
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

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(DataTable)))