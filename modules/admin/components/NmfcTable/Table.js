import React, { Component } from 'react'
import ProdexTable from '~/components/table'
import { getSafe, generateToastMarkup } from '~/utils/functions'
import confirm from '~/src/components/Confirmable/confirm'

export default class Table extends Component {
  render() {
    const {
      config,
      intl: { formatMessage },
      loading,
      datagrid,
      filterValue,
      openEditPopup,
      deleteNmfcNumber,
      toastManager
    } = this.props

    let rows = getSafe(() => datagrid.rows, [])

    const { tableName, formattedMessageName } = config
    const { columns } = config.display

    return (
      <ProdexTable
        tableName={tableName}
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
                  id: `confirm.delete${formattedMessageName}.title`,
                  defaultMessage: 'Delete NMFC Number'
                }),
                formatMessage(
                  {
                    id: `confirm.delete${formattedMessageName}.content`,
                    defaultMessage: `Do you really want to delete NMFC Number with code: ${row.code}?`
                  },
                  { code: row.code }
                )
              ).then(async () => {
                await deleteNmfcNumber(row.id)
              })
          }
        ]}
      />
    )
  }
}
