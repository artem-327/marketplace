import { useState, useEffect } from 'react'
//Components
import ProdexTable from '../../../components/table'
import DetailRow from './DetailRow/DetailRow'
//Constants
import { COLUMNS } from '../constants'
//Hooks
import { usePrevious } from '../../../hooks'
//Services
import { getStatuses } from '../MyNetwork.services'

/**
 * Table of connections.
 * @category My Network
 * @component
 */
const Table = props => {
  const [expandedRowIds, setExpandedRowIds] = useState([])
  const {
    loadingDatagrid,
    rows,
    connectionsStatuses,
    statuses,
    buttonActionsDetailRow,
    getConnection,
    loadingDetailRow,
    datagrid,
    showBluePallet
  } = props
  const prevLoadingDatagrid = usePrevious(loadingDatagrid)
  const query = datagrid?.query

  useEffect(() => {
    if (
      prevLoadingDatagrid &&
      !loadingDatagrid &&
      rows.length &&
      (typeof query?.status === 'undefined' || query?.status === 'ALL') &&
      (typeof query?.companyName === 'undefined' || query?.companyName === '')
    ) {
      connectionsStatuses(getStatuses(rows))
    }
  }, [query, loadingDatagrid, prevLoadingDatagrid, rows, connectionsStatuses])

  const expandRow = async row => {
    let ids = expandedRowIds.slice()
    if (ids.includes(row.id)) {
      setExpandedRowIds(ids.filter(id => id !== row.id))
    } else {
      if (row.connectedCompany.id === 1) {
        showBluePallet()
        //return false
      }
      ids.push(row.id)
      setExpandedRowIds(ids)
      await getConnection(row.id)
    }
  }

  const getRowDetail = ({ row }) => {
    return (
      <DetailRow
        row={row}
        expandRow={() => expandRow(row)}
        buttonActionsDetailRow={buttonActionsDetailRow}
        loadingDetailRow={loadingDetailRow}
      />
    )
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
