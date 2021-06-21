import { FormattedMessage } from 'react-intl'
import confirm from '../../../../components/Confirmable/confirm'
import ProdexTable from '../../../../components/table'
import ActionCell from '../../../../components/table/ActionCell'

const LogisticsTable = props => {
  const columns = [
    {
      name: 'name',
      title: (
        <FormattedMessage id='global.name' defaultMessage='Name' />
      ),
      width: 300,
      allowReordering: false
    },
    {
      name: 'identifierType',
      title: (
        <FormattedMessage id='logistics.identifierType' defaultMessage='Identifier Type' />
      ),
      width: 300
    },
    {
      name: 'identifierValue',
      title: (
        <FormattedMessage id='logistics.identifierValue' defaultMessage='Identifier Value' />
      ),
      width: 300
    },
    {
      name: 'reinvoice',
      title: (
        <FormattedMessage id='logistics.reinvoice' defaultMessage='Re-Invoice' />
      ),
      width: 120
    },
    {
      name: 'email',
      title: (
        <FormattedMessage id='global.email' defaultMessage='Email' />
      ),
      width: 200
    }
  ]

  const getActions = () => {
    const {
      datagrid,
      openPopup,
      intl: { formatMessage },
      deleteLogisticsProvider
    } = props

    return [
      {
        text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
        callback: row => openPopup(row.rawData)
      },
      {
        text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
        callback: row =>
          confirm(
            formatMessage({
              id: 'confirm.admin.deleteLogisticProvider.title',
              defaultMessage: 'Delete Logistic Provider'
            }),
            formatMessage(
              {
                id: 'confirm.admin.deleteLogisticProvider.content',
                defaultMessage: "Do you really want to delete '{name}' logistic provider?"
              },
              { name: row.rawData.name }
            )
          ).then(async () => {
            try {
              await deleteLogisticsProvider(row.id)
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
        name: (
          <ActionCell
            row={row}
            getActions={getActions}
            content={row.name}
            onContentClick={() => props.openPopup(row.rawData)}
          />
        )
      }
    })
  }

  const { loading, rows, datagrid, filterValue } = props

  return (
    <div className='flex stretched listings-wrapper'>
      <ProdexTable
        tableName='admin_logistics_providers'
        {...datagrid.tableProps}
        filterValue={filterValue}
        loading={datagrid.loading || loading}
        columns={columns}
        rows={getRows(rows)}
      />
    </div>
  )
}

export default LogisticsTable
