/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'

// Components
import ProdexTable from '../../../../components/table'
import Tutorial from '../../../tutorial/Tutorial'
import ListingDetail from './ListingDetail/ListingDetail'


// Hooks
//import { usePrevious } from '../../../hooks'

// Styles
import {
  IconDown,
  IconUp,

} from './SharedListings.styles'

// Services
import {
  getRows
} from './SharedListings.services'

// Constants
import {
  COLUMNS
} from './SharedListings.constants'

const SharedListings = props => {
  const [expandedRowIds, setExpandedRowIds] = useState([])


  const {
    datagrid,
    rows,

  } = props

  const state = {
    expandedRowIds, setExpandedRowIds
  }

  // Similar to call componentDidMount:
  useEffect(() => {
  }, [])  // If [] is empty then is similar as componentDidMount.


  // This useEffect is used similar as componentDidUpdate
  // Could by used in previous (above) useEffect, but this approach is more clear
  useEffect(() => {

  }, [/* variableName */])



  const getRowDetail = (row, props, state) => {
    // ! ! predat potrebne props
    return (
      <ListingDetail
        row={row.rawData}
        parentState={state}

      />
    )
  }

  return (
    <>
      <div>
        table handlers
      </div>
      <div className='flex stretched inventory-wrapper listings-wrapper' style={{ padding: '10px 30px' }}>
        <ProdexTable
          {...datagrid.tableProps}
          tableName='inventory_shared_listings_grid'
          columns={COLUMNS}
          rows={getRows(rows, props)}
          hideCheckboxes
          loading={datagrid.loading}
          rowDetailType={true}
          rowDetail={({ row }) => getRowDetail(row, props, state)}
          groupBy={['groupProductName']}
          getChildGroups={rows =>
            _(rows)
              .groupBy('groupProductName')
              .map(v => {
                return {
                  key: `${v[0].groupProductName}_${v[0].companyProduct.id}`,
                  childRows: v,
                  groupLength: v.length
                }
              })
              .value()
          }
          renderGroupLabel={({ row: { value }, groupLength }) => null}
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
          toggleCellComponent={null}
          estimatedRowHeight={1500}
        />
        </div>
    </>
  )
}

SharedListings.propTypes = {
  //PropTypes.number
}

SharedListings.defaultProps = {

}

export default injectIntl(SharedListings)