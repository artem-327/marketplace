// Components
import ProdexTable from '../../../../components/table'
// Constants
import { COLUMNS } from './Carriers.constants'
// Services
import { getRows } from './Carriers.services'

const Carriers = props => {
  const { loading, updating, rows, datagrid, filterValue } = props

  return (
    <div className='flex stretched listings-wrapper'>
      <ProdexTable
        tableName='admin_carriers'
        {...datagrid.tableProps}
        filterValue={filterValue}
        loading={datagrid.loading || loading || updating}
        columns={COLUMNS}
        rows={getRows(rows, props)}
      />
    </div>
  )
}

export default Carriers
