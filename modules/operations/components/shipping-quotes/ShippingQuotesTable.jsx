import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
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

ShippingQuotesTable.propTypes = {
  datagrid: PropTypes.object, 
  intl: PropTypes.object,
  loading: PropTypes.bool,
  filterValue: PropTypes.string, 
  rows: PropTypes.array, 
  deleteShippingQuote: PropTypes.func,
  downloadAttachment: PropTypes.func,
  generateBOL: PropTypes.func
}

ShippingQuotesTable.defaultValues = {
  datagrid: {}, 
  intl: {},
  loading: false,
  filterValue: '', 
  rows: [],
  deleteShippingQuote: () => {},
  downloadAttachment: () => {},
  generateBOL: () => {}
}

export default injectIntl(ShippingQuotesTable)
