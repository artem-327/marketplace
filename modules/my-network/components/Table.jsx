import { useState } from 'react'
//Components
import ProdexTable from '../../../components/table'
import DetailRow from './DetailRow/DetailRow'

//Constants
import { COLUMNS } from '../constants'

const Table = props => {
  const [expandedRowIds, setExpandedRowIds] = useState([])
  const getRows = () => {
    return [
      {
        id: 1,
        member: 'AAA',
        connectionStatus: 'Declined',
        eligibilityCriteria: [1, 1, 2, 3, 5],
        date: '01/12/2021'
      },
      {
        id: 2,
        member: 'BBB',
        connectionStatus: 'Pending',
        eligibilityCriteria: [1, 1, 2, 3, 5],
        date: '01/12/2021'
      },
      {
        id: 3,
        member: 'CCC',
        connectionStatus: 'Active',
        eligibilityCriteria: [1, 1, 2, 3, 5],
        date: '01/12/2021'
      },

      {
        id: 4,
        member: 'AAA',
        connectionStatus: 'Declined',
        eligibilityCriteria: [1, 1, 2, 3, 5],
        date: '01/12/2021'
      },
      {
        id: 5,
        member: 'BBB',
        connectionStatus: 'Pending',
        eligibilityCriteria: [1, 1, 2, 3, 5],
        date: '01/12/2021'
      },
      {
        id: 6,
        member: 'CCC',
        connectionStatus: 'Active',
        eligibilityCriteria: [1, 1, 2, 3, 5],
        date: '01/12/2021'
      },
      {
        id: 7,
        member: 'AAA',
        connectionStatus: 'Declined',
        eligibilityCriteria: [1, 1, 2, 3, 5],
        date: '01/12/2021'
      },
      {
        id: 8,
        member: 'BBB',
        connectionStatus: 'Pending',
        eligibilityCriteria: [1, 1, 2, 3, 5],
        date: '01/12/2021'
      },
      {
        id: 9,
        member: 'CCC',
        connectionStatus: 'Active',
        eligibilityCriteria: [1, 1, 2, 3, 5],
        date: '01/12/2021'
      },

      {
        id: 10,
        member: 'AAA',
        connectionStatus: 'Declined',
        eligibilityCriteria: [1, 1, 2, 3, 5],
        date: '01/12/2021'
      },
      {
        id: 11,
        member: 'BBB',
        connectionStatus: 'Pending',
        eligibilityCriteria: [1, 1, 2, 3, 5],
        date: '01/12/2021'
      },
      {
        id: 12,
        member: 'CCC',
        connectionStatus: 'Active',
        eligibilityCriteria: [1, 1, 2, 3, 5],
        date: '01/12/2021'
      }
    ]
  }

  const getRowDetail = ({ row }) => {
    return <DetailRow row={row} />
  }

  return (
    <div>
      <div className='flex stretched table-detail-rows-wrapper'>
        <ProdexTable
          tableName='my_network'
          columns={COLUMNS}
          loading={props.loading}
          rows={getRows()}
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
          // onSortingChange={sorting => sorting.sortPath && this.setState({ sorting })}
          defaultSorting={{ columnName: 'member', direction: 'desc' }}
          estimatedRowHeight={1000}
        />
      </div>
    </div>
  )
}

export default Table
