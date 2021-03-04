import { useState, useEffect } from 'react'
import axios from 'axios'
import { Image } from 'semantic-ui-react'

//Components
import ProdexTable from '../../../components/table'
import DetailRow from './DetailRow/DetailRow'
import api from '../../../api'

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

  const loadCompanyLogo = async (hasLogo, idCompany) => {
    let companyLogo = null
    try {
      if (hasLogo) {
        companyLogo = await props.getCompanyLogo(idCompany)

        console.log('companyLogo')
        console.log(companyLogo)
      }
    } catch (error) {
      console.error(error)
      return
    }

    if (companyLogo) {
      const file = new Blob([companyLogo], { type: companyLogo?.type })
      let fileURL = URL.createObjectURL(file)

      return fileURL
    }

    return ''
  }

  const getRows = rows => {
    return rows.map(row => {
      return {
        ...row,
        member: (
          <div>
            <Image
              verticalAlign='middle'
              size='mini'
              spaced={true}
              src={loadCompanyLogo(row?.hasLogo, row?.connectedCompany?.id)}
            />
            <b>{row?.connectedCompany?.name}</b>
          </div>
        )
      }
    })
  }

  return (
    <div className='flex stretched table-detail-rows-wrapper'>
      <ProdexTable
        tableName='my_network'
        columns={COLUMNS}
        loading={loadingDatagrid}
        rows={getRows(rows)}
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
