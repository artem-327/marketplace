import { useState, useEffect } from 'react'
//Components
import ProdexTable from '../../../components/table'
import DetailRow from './DetailRow/DetailRow'
//Constants
import { COLUMNS } from '../constants'
//Hooks
import { usePrevious } from '../../../hooks'

/**
 * Table of connections.
 * @category My Network
 * @component
 */
const Table = props => {
  const [expandedRowIds, setExpandedRowIds] = useState([])
  const { loadingDatagrid, rows, connectionsStatuses, statuses, getLogo } = props
  const prevLoadingDatagrid = usePrevious(loadingDatagrid)

  useEffect(() => {
    if (prevLoadingDatagrid && !loadingDatagrid) {
      connectionsStatuses(statuses)
    }
  }, [prevLoadingDatagrid, loadingDatagrid, statuses, connectionsStatuses])

  const expandRow = row => {
    let ids = expandedRowIds.slice()
    if (ids.includes(row.id)) {
      setExpandedRowIds(ids.filter(id => id !== row.id))
    } else {
      ids.push(row.id)
      setExpandedRowIds(ids)
    }
  }

  const getRowDetail = ({ row }) => {
    return <DetailRow row={row} expandRow={() => expandRow(row)} />
  }

  return (
    <div className='flex stretched table-detail-rows-wrapper'>
      <ProdexTable
        tableName='my_network'
        columns={COLUMNS}
        loading={loadingDatagrid}
        rows={rows}
        rowDetailType={true}
        rowDetail={getRowDetail}
        onRowClick={(_, row) => expandRow(row)}
        expandedRowIds={expandedRowIds}
        onExpandedRowIdsChange={expandedRowIds => setExpandedRowIds(expandedRowIds)}
        estimatedRowHeight={1000}
      />
    </div>
  )
}

export default Table
