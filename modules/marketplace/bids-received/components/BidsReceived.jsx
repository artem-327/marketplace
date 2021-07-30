import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import Router from 'next/router'
import { Container, Input } from 'semantic-ui-react'
// Components
import BidsRowDetail from '../../components/BidsRowDetailContainer'
import ProdexGrid from '../../../../components/table'
import ColumnSettingButton from '../../../../components/table/ColumnSettingButton'
import Tutorial from '../../../tutorial/Tutorial'
// Constants
import { COLUMNS } from './BidsReceived.constants'
// Styles
import { CustomRowDiv } from '../../../inventory/styles'
// Services
import { setInitFilters, handleFilterChangeInputSearch, getRows, handleUpdateFinished } from './BidsReceived.services'
import { getSafe } from '../../../../utils/functions'

/**
 * BidsReceived Component
 * @category Marketplace - Bids received
 * @components
 */
const BidsReceived = props => {
  const [expandedRowIds, setExpandedRowIds] = useState([])
  const [filterValues, setFilterValues] = useState({ searchInput: '' })
  const [rowDetailState, setRowDetailState] = useState(null)

  const state = { expandedRowIds, setExpandedRowIds, filterValues, setFilterValues, rowDetailState, setRowDetailState }

  useEffect(() => {
    const { datagrid } = props
    const initId = parseInt(getSafe(() => Router.router.query.id, 0))
    if (initId) {
      datagrid.setSearch({ initId }, true, 'pageFilters')
      setExpandedRowIds([initId])
    } else {
      setInitFilters(state, props)
    }

    return () => {
      const { isOpenPopup, closePopup } = props
      if (!getSafe(() => Router.router.query.id, 0)) {
        props.handleVariableSave('tableHandlersFiltersBidsReceived', filterValues)
      }
      if (isOpenPopup) closePopup()
    }
  }, []) 

  const { datagrid, intl, loading } = props
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
        seller
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
          tableName='marketplace_bids_received_grid'
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
    </Container>

  )
}

BidsReceived.propTypes = {
  datagrid: PropTypes.object,
  intl: PropTypes.object,
  tableHandlersFiltersBidsReceived: PropTypes.object,
  isOpenPopup: PropTypes.bool,
  loading: PropTypes.bool,
  rows: PropTypes.array,
  closePopup: PropTypes.func,
  handleVariableSave: PropTypes.func,
  acceptOffer: PropTypes.func,
  rejectOffer: PropTypes.func
}

BidsReceived.defaultProps = {
  datagrid: {},
  intl: {},
  tableHandlersFiltersBidsReceived: {},
  isOpenPopup: false,
  loading: false,
  rows: [],
  closePopup: () => {},
  handleVariableSave: () => {},
  acceptOffer: () => {},
  rejectOffer: () => {}
}

export default injectIntl(BidsReceived)