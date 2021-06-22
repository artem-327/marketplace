import { useEffect } from 'react'
// Components
import ProdexTable from '../../../../components/table'
// Services
import { columns, getRows } from './UnitOfMeasureTable.services'

const UnitOfMeasureTable = props => {
  useEffect(() => {
    props.getMeasureTypesDataRequest()
  }, [])
  
  const { loading, rows, datagrid, filterValue } = props

  const { tableName } = props.config

  return (
    <div className='flex stretched listings-wrapper'>
      <ProdexTable
        tableName={tableName}
        {...datagrid.tableProps}
        filterValue={filterValue}
        loading={datagrid.loading || loading}
        columns={columns}
        rows={getRows(rows, props)}
      />
    </div>
  )
}

export default UnitOfMeasureTable
