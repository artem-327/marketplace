/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { debounce } from 'lodash'
import Router from 'next/router'

// Constants
import { COLUMNS } from './BidsSent.constants'

// Components
import BidsRowDetail from '../../components/BidsRowDetail'
import { Container, Input } from 'semantic-ui-react'
import ProdexGrid from '~/components/table'
import ColumnSettingButton from '~/components/table/ColumnSettingButton'
import Tutorial from '~/modules/tutorial/Tutorial'
import MakeOfferPopup from '../../listings/components/MakeOfferPopup'

// Styles
import { CustomRowDiv } from '~/modules/inventory/constants/layout'

// Services
import { setInitFilters, handleFilterChangeInputSearch, getRows, handleUpdateFinished } from './BidsSent.services'
import { getSafe } from '~/utils/functions'

const BidsSent = props => {
  const [expandedRowIds, setExpandedRowIds] = useState([])
  const [filterValues, setFilterValues] = useState({ searchInput: '' })
  const [rowDetailState, setRowDetailState] = useState(null)

  const state = { expandedRowIds, setExpandedRowIds, filterValues, setFilterValues, rowDetailState, setRowDetailState }

  // Similar to call componentDidMount:
  useEffect(() => {
    const { datagrid } = props
    const initId = parseInt(getSafe(() => Router.router.query.id, 0))
    if (initId) {
      datagrid.setSearch({ initId }, true, 'pageFilters')
      setExpandedRowIds([initId])
    } else {
      setInitFilters(state, props)
    }

    // returned function will be called on component unmount
    return () => {
      const { isOpenPopup, closePopup } = props
      if (!getSafe(() => Router.router.query.id, 0)) {
        props.handleVariableSave('tableHandlersFiltersBidsSent', filterValues)
      }
      if (isOpenPopup) closePopup()
    }
  }, [])  // If [] is empty then is similar as componentDidMount.

  const { datagrid, intl, loading, isOpenPopup } = props
  let { formatMessage } = intl
  const rows = getRows(state, props)

  const getRowDetail = ({ row }, state, props) => {
    return (
      <BidsRowDetail
        initValues={state.rowDetailState}
        popupValues={row}
        onUnmount={values => state.setRowDetailState(values)}
        onClose={() => {
          state.setExpandedRowIds([])
          handleUpdateFinished(state, props)
        }}
      />
    )
  }

  return (
    <Container fluid style={{ padding: '10px 25px' }} className='flex stretched'>
      {<Tutorial marginMarketplace isTutorial={false} isBusinessVerification={true} />}
      <div style={{ padding: '10px 0' }}>
        <CustomRowDiv>
          <div>
            <div className='column'>
              <Input
                style={{ width: '370px' }}
                icon='search'
                name='searchInput'
                value={state.filterValues.searchInput}
                placeholder={formatMessage({
                  id: 'marketplace.SearchBidByNameOrCompany',
                  defaultMessage: 'Search bid by name or company...'
                })}
                onChange={(e, data) => handleFilterChangeInputSearch(e, data, state, props)}
              />
            </div>
          </div>
          <ColumnSettingButton />
        </CustomRowDiv>
      </div>

      <div className='flex stretched table-detail-rows-wrapper'>
        <ProdexGrid
          tableName='marketplace_bids_sent_grid'
          {...datagrid.tableProps}
          loading={datagrid.loading || loading}
          rows={rows}
          columns={COLUMNS}
          rowDetailType={true}
          rowDetail={data => getRowDetail(data, state, props)}
          expandedRowIds={expandedRowIds}
          rowSelection={true}
          lockSelection={false}
          showSelectAll={false}
          isToggleCellComponent={false}
          estimatedRowHeight={1000} // to fix virtual table for large rows - hiding them too soon and then hiding the whole table
        />
      </div>
      {isOpenPopup && <MakeOfferPopup />}
    </Container>

  )
}

BidsSent.propTypes = {
}

BidsSent.defaultProps = {
}

export default injectIntl(BidsSent)