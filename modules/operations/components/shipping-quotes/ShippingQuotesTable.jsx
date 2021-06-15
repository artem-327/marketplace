import ProdexGrid from '../../../../components/table'
import ActionCell from '../../../../components/table/ActionCell'
import confirm from '../../../../components/Confirmable/confirm'
import { FormattedMessage, injectIntl } from 'react-intl'

const ShippingQuotesTable = props => {
  const columns = [
    {
      name: 'quoteId',
      title: (
        <FormattedMessage id='operations.quoteId' defaultMessage='Quote Id' />
      ),
      allowReordering: false,
      width: 400
    },
    {
      name: 'validityDate',
      title: (
        <FormattedMessage id='operations.validityDate' defaultMessage='Validity Date' />
      ),
      width: 200
    },
    {
      name: 'price',
      title: (
        <FormattedMessage id='operations.price' defaultMessage='Price' />
      ),
      width: 100
    },
    {
      name: 'carrierName',
      title: (
        <FormattedMessage id='operations.carrierName' defaultMessage='Carrier Name' />
      ),
      width: 200
    }
  ]

  const getActions = () => {
    const { intl, deleteShippingQuote, datagrid } = props

    const { formatMessage } = intl
    return [
      {
        text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
        callback: row =>
          confirm(
            formatMessage({ id: 'confirm.deleteShippingQuote', defaultMessage: 'Delete Shipping Quote' }),
            formatMessage(
              { id: 'confirm.deleteItem', defaultMessage: `Do you really want to delete ${row.quoteId}?` },
              { item: row.quoteId }
            )
          ).then(async () => {
            try {
              await deleteShippingQuote(row.id)
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
        quoteId: <ActionCell row={row} getActions={getActions} content={row.quoteId} />
      }
    })
  }

  const { datagrid, rows, filterValue, loading } = props

  return (
    <div className='flex stretched listings-wrapper'>
      <ProdexGrid
        tableName='operations_shipping_quotes'
        {...datagrid.tableProps}
        filterValue={filterValue}
        columns={columns}
        rows={getRows(rows)}
        loading={datagrid.loading || loading}
        style={{ marginTop: '5px' }}
      />
    </div>
  )
}

export default injectIntl(ShippingQuotesTable)
