import PropTypes from 'prop-types'
// Components
import ProdexTable from '../../../../components/table'
// Services
import { columns, getRows } from './LogisticsTable.services'

/**
 * LogisticsTable Component
 * @category Admin Settings - Logistics
 * @components
 */
const LogisticsTable = props => {
  
  const { loading, rows, datagrid, filterValue } = props

  return (
    <div className='flex stretched listings-wrapper'>
      <ProdexTable
        tableName='admin_logistics_providers'
        {...datagrid.tableProps}
        filterValue={filterValue}
        loading={datagrid.loading || loading}
        columns={columns}
        rows={getRows(rows, props)}
      />
    </div>
  )
}

LogisticsTable.propTypes = {
  loading: PropTypes.bool,
  rows: PropTypes.array,
  filterValue: PropTypes.string,
  openPopup: PropTypes.func,
  deleteLogisticsProvider: PropTypes.func,
  datagrid: PropTypes.object,
  intl: PropTypes.object
}

LogisticsTable.defaultValues = {
  loading: false,
  rows: [],
  filterValue: '',
  openPopup: () => {},
  deleteLogisticsProvider: () => {},
  datagrid: {},
  intl: {}
}

export default LogisticsTable
