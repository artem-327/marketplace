import { injectIntl } from 'react-intl'
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

export default injectIntl(CompanyInventoryTable)
