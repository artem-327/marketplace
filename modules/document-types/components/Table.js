import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import confirm from '~/src/components/Confirmable/confirm'
import ProdexTable from '~/components/table'
import { getDataRequest, openEditPopup, closeConfirmPopup, deleteConfirmation } from '../actions'
import { withDatagrid } from '~/modules/datagrid'
import { FormattedMessage } from 'react-intl'

const columns = [
  {
    name: 'name',
    title: (
      <FormattedMessage id='global.name' defaultMessage='Name'>
        {text => text}
      </FormattedMessage>
    ),
    sortPath: 'DocumentType.name'
  }
]
class Table extends Component {
  render() {
    const { intl, loading, rows, datagrid, filterValue, openEditPopup, deleteConfirmation } = this.props

    const { formatMessage } = intl

    return (
      <React.Fragment>
        <ProdexTable
          tableName='admin_document_types'
          {...datagrid.tableProps}
          filterValue={filterValue}
          loading={datagrid.loading || loading}
          columns={columns}
          rows={rows}
          rowActions={[
            { text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }), callback: row => openEditPopup(row) },
            {
              text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
              callback: row =>
                confirm(
                  formatMessage({
                    id: `confirm.deleteDocumentType.title`,
                    defaultMessage: `Delete Document Type`
                  }),
                  formatMessage(
                    {
                      id: `confirm.deleteDocumentType.content`,
                      defaultMessage: `Do you really want to delete '${row.name}' document type?`
                    },
                    { name: row.name }
                  )
                ).then(() => deleteConfirmation(row.id))
            }
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

const mapStateToProps = (state, { datagrid }) => {
  return {
    rows: datagrid.rows,
    filterValue: state.admin.filterValue,
    loading: state.documentTypes.loading
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(Table)))
