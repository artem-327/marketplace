import { FormattedMessage } from 'react-intl'
// Components
import ProdexTable from '../../../../components/table'
import ActionCell from '../../../../components/table/ActionCell'
// Services
import confirm from '../../../../components/Confirmable/confirm'

const Table = props => {
  const columns = [
    {
      name: 'code',
      title: (
        <FormattedMessage id='global.code' defaultMessage='Code' />
      ),
      sortPath: 'NmfcNumber.prefix',
      allowReordering: false
    },
    {
      name: 'description',
      title: (
        <FormattedMessage id='global.description' defaultMessage='Description' />
      ),
      sortPath: 'NmfcNumber.description'
    }
  ]

  const getActions = () => {
    const {
      config,
      intl: { formatMessage },
      openEditPopup,
      deleteNmfcNumber,
      datagrid
    } = props

    const { formattedMessageName } = config

    return [
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
            try {
              await deleteNmfcNumber(row.id)
              datagrid.removeRow(row.id)
            } catch (e) {
              console.error(e)
            }
          })
      }
    ]
  }

  const getRows = rows => {
    return rows.map(row => {
      return {
        ...row,
        code: (
          <ActionCell
            row={row}
            getActions={getActions}
            content={row.code}
            onContentClick={() => props.openEditPopup(row)}
          />
        )
      }
    })
  }

  const { config, loading, datagrid, filterValue } = props

  const { tableName } = config

  return (
    <div className='flex stretched listings-wrapper'>
      <ProdexTable
        tableName={tableName}
        {...datagrid.tableProps}
        filterValue={filterValue}
        loading={datagrid.loading || loading}
        columns={columns}
        rows={getRows(datagrid.tableProps.rows)}
      />
    </div>
  )
}

export default Table