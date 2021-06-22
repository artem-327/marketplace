// Components
import ProdexTable from '../../../../components/table'
// Services
import { columns, getRows } from './LogisticsTable.services'

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

export default LogisticsTable
