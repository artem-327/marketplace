import React, { Component } from 'react'
import ProdexGrid from '~/components/table'
import { connect } from 'react-redux'
import { withDatagrid } from '~/modules/datagrid'
import { injectIntl } from 'react-intl'
import { companyDatagridColumns, mapCompanyRows } from '~/constants/index'
import { deleteClientCompany, openPopup } from '../../actions'

const columns = companyDatagridColumns

class Table extends Component {
  render() {
    const { datagrid, rows, intl, openPopup, deleteClientCompany } = this.props
    const { formatMessage } = intl
    // TODO - byl tam nejaky jeden field navic u tech client companies oproti norm. company
    // TODO - otestovat jakmile budou endpointy aktivni
    // TODO - pridat row actions na edit/delete
    return (
      <ProdexGrid
        {...datagrid.tableProps}
        loading={datagrid.loading}
        tableName='settings_client_companies'
        rows={rows}
        columns={columns}
        rowActions={[
          {
            text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
            callback: row => openPopup(row.rawData)
          },
          {
            text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
            callback: row =>
              confirm(
                formatMessage({ id: 'confirm.deleteClientCompany', defaultMessage: 'Delete Client Company' }),
                formatMessage(
                  { id: 'confirm.deleteItem', defaultMessage: `Do you really want to delete ${row.displayName}?` },
                  { item: row.displayName }
                )
              ).then(() => {
                deleteClientCompany(row.id)
              })
          }
        ]}
      />
    )
  }
}

const mapDispatchToProps = {
  deleteClientCompany,
  openPopup
}

const mapStateToProps = (_state, { datagrid }) => {
  return {
    rows: mapCompanyRows(datagrid.rows)
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(Table)))
