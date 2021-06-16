import { injectIntl } from 'react-intl'
// Components
import ProdexGrid from '../../../../components/table'
// Services
import { columns, getRowss } from './ShippingQuotes.services'

const ShippingQuotesTable = props => {
  const { datagrid, rows, filterValue, loading } = props

  return (
    <div className='flex stretched listings-wrapper'>
      <ProdexGrid
        tableName='operations_shipping_quotes'
        {...datagrid.tableProps}
        filterValue={filterValue}
        columns={columns}
        rows={getRowss(rows, props)}
        loading={datagrid.loading || loading}
        style={{ marginTop: '5px' }}
      />
    </div>
  )
}

export default injectIntl(ShippingQuotesTable)
