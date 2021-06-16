import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
// Components
import ProdexGrid from '../../../../components/table'
// Services
import { columns, getRowss } from './CompanyProductTable.services'

const CompanyProductTable = props => {
  const { datagrid, rows, filterValue, loading, intl } = props

  return (
    <div className='flex stretched listings-wrapper'>
      <ProdexGrid
        tableName='operations_company_product_catalog'
        {...datagrid.tableProps}
        filterValue={filterValue}
        columns={columns}
        rows={getRowss(rows)}
        loading={datagrid.loading || loading}
        style={{ marginTop: '5px' }}
      />
    </div>
  )
}

CompanyProductTable.propTypes = {
  datagrid: PropTypes.object, 
  intl: PropTypes.object,
  loading: PropTypes.bool,
  filterValue: PropTypes.string, 
  rows: PropTypes.array
}

CompanyProductTable.defaultValues = {
  datagrid: {}, 
  intl: {},
  loading: false,
  filterValue: '', 
  rows: []
}

export default injectIntl(CompanyProductTable)
