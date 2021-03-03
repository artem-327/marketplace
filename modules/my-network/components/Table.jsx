import { useState, useEffect } from 'react'
//Components
import ProdexTable from '../../../components/table'
import DetailRow from './DetailRow/DetailRow'
//Constants
import { COLUMNS, CONNECTIONS_STATUSES } from '../constants'
//Hooks
import { usePrevious } from '../../../hooks'

/**
 * Table of connections.
 * @category My Network
 * @component
 */
const Table = props => {
  const [expandedRowIds, setExpandedRowIds] = useState([])
  const { loadingDatagrid, rows, connectionsStatuses, statuses } = props
  const prevLoadingDatagrid = usePrevious(loadingDatagrid)

  useEffect(() => {
    if (prevLoadingDatagrid && !loadingDatagrid) connectionsStatuses(statuses)
  }, [prevLoadingDatagrid, loadingDatagrid, statuses, connectionsStatuses])

  const getRowDetail = ({ row }) => {
    return <DetailRow row={row} />
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
        onRowClick={(_, row) => {
          let ids = expandedRowIds.slice()
          if (ids.includes(row.id)) {
            setExpandedRowIds(ids.filter(id => id !== row.id))
          } else {
            ids.push(row.id)
            setExpandedRowIds(ids)
          }
        }}
        expandedRowIds={expandedRowIds}
        onExpandedRowIdsChange={expandedRowIds => setExpandedRowIds(expandedRowIds)}
        estimatedRowHeight={1000}
      />
    </div>
  )
}

export default Table
