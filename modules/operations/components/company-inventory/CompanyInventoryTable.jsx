import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
// Components
import ProdexGrid from '../../../../components/table'
// Services
import { columns, getRowss } from './CompanyInventoryTable.services'

const CompanyInventoryTable = props => {
  const { datagrid, rows, filterValue, loading, intl } = props

  return (
    <div className='flex stretched listings-wrapper'>
      <ProdexGrid
        tableName='operations_company_inventory'
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

CompanyInventoryTable.propTypes = {
  datagrid: PropTypes.object, 
  intl: PropTypes.object,
  loading: PropTypes.bool,
  filterValue: PropTypes.string, 
  rows: PropTypes.array
}

CompanyInventoryTable.defaultValues = {
  datagrid: {}, 
  intl: {},
  loading: false,
  filterValue: '', 
  rows: []
}

export default injectIntl(CompanyInventoryTable)
