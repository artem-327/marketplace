/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getSafe } from '~/utils/functions'

// Components
import ProdexTable from '../../../../components/table'
import Tutorial from '../../../tutorial/Tutorial'
import ListingDetail from './ListingDetail/ListingDetail'
import TableHandler from './TableHandler'
import { Broadcast } from '../../../broadcast'
import ModalPriceBook from './ModalPriceBook/ModalPriceBook'

// Hooks
//import { usePrevious } from '../../../hooks'

// Styles
import { IconDown, IconUp } from './SharedListings.styles'

// Services
import { getRows } from './SharedListings.services'

// Constants
import { COLUMNS } from './SharedListings.constants'

const SharedListings = props => {
  const [expandedRowIds, setExpandedRowIds] = useState([])

  const [values, setValues] = useState({
    header: {
      // ! ! hodit to asi do .constants.js ?
      pricingTabIndex: 0,
      markup: ''
    },
    tabs: {
      activeTab: 0
    }
  })

  const { datagrid, rows, activeTab, setActiveTab, isOpenPriceBookModal, triggerPriceBookModal, rowIdPriceBook } = props

  const state = {
    expandedRowIds,
    setExpandedRowIds
  }

  const getRowDetail = (row, props, state) => {
    return <ListingDetail row={row.rawData} parentState={state} values={values} onChange={data => setValues(data)} />
  }

  return (
    <>
      <ModalPriceBook
        isOpenPriceBookModal={isOpenPriceBookModal}
        triggerPriceBookModal={triggerPriceBookModal}
        rowIdPriceBook={rowIdPriceBook}
      />

      <TableHandler datagrid={datagrid} />
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
            setActiveTab(0)
            let ids = expandedRowIds.slice()
            if (ids.includes(row.id)) {
              setValues(prevValues => ({
                ...prevValues,
                header: { ...prevValues.header, markup: '' },
                tabs: { activeTab: 0 }
              }))
              setExpandedRowIds([])
            } else {
              setExpandedRowIds([row.id])
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

SharedListings.defaultProps = {}

export default SharedListings
