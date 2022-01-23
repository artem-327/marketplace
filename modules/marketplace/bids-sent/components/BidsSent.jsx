import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import Router from 'next/router'
// Components
import BidsRowDetail from '../../components/BidsRowDetailContainer'
import { Container, Input } from 'semantic-ui-react'
import ProdexGrid from '../../../../components/table'
import ColumnSettingButton from '../../../../components/table/ColumnSettingButton'
import Tutorial from '../../../tutorial/Tutorial'
import MakeOfferPopup from '../../listings/components/MakeOfferPopupContainer'
import DeaPopup from '../../listings/components/ConfirmationPopups/DeaPopup'
import DhsPopup from '../../listings/components/ConfirmationPopups/DhsPopup'
// Constants
import { COLUMNS } from './BidsSent.constants'
// Styles
import { CustomRowDiv } from '../../../inventory/styles'
// Services
import {
  setInitFilters,
  handleFilterChangeInputSearch,
  getRows,
  handleUpdateFinished,
  handleAddToCart
} from './BidsSent.services'
import { getSafe } from '../../../../utils/functions'

/**
 * BidsSent Component
 * @category Marketplace - Bids sent
 * @components
 */
const BidsSent = props => {
  const [expandedRowIds, setExpandedRowIds] = useState([])
  const [filterValues, setFilterValues] = useState({ searchInput: '' })
  const [rowDetailState, setRowDetailState] = useState(null)
  const [buyAttemptHasDeaI, setBuyAttemptHasDeaI] = useState(null)
  const [buyAttemptHasDeaII, setBuyAttemptHasDeaII] = useState(null)
  const [buyAttemptHasDhs, setBuyAttemptHasDhs] = useState(null)

  const state = {
    expandedRowIds,
    setExpandedRowIds,
    filterValues,
    setFilterValues,
    rowDetailState,
    setRowDetailState,
    buyAttemptHasDeaI,
    setBuyAttemptHasDeaI,
    buyAttemptHasDeaII,
    setBuyAttemptHasDeaII,
    buyAttemptHasDhs,
    setBuyAttemptHasDhs
  }

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
        props.handleVariableSave('tableHandlersFiltersBidsSent', filterValues)
      }
      if (isOpenPopup) closePopup()
    }
  }, []) 

  const { datagrid, intl, loading, isOpenPopup, regulatoryDeaListAuthorized, regulatoryDhsCoiAuthorized } = props
  let { formatMessage } = intl
  const rows = getRows(state, props)

  const getRowDetail = ({ row }, state, props) => {
    return (
      <BidsRowDetail
        regulatoryDeaListAuthorized={props.regulatoryDeaListAuthorized}
        regulatoryDhsCoiAuthorized={props.regulatoryDhsCoiAuthorized}
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
          noScrollEvent={true}
          estimatedRowHeight={1000} // to fix virtual table for large rows - hiding them too soon and then hiding the whole table
        />
      </div>
      {isOpenPopup && <MakeOfferPopup />}
      {( buyAttemptHasDeaI || buyAttemptHasDeaII) && !buyAttemptHasDhs && (
        <DeaPopup
          deaListIIType={!buyAttemptHasDeaI}
          permissionsToBuy={regulatoryDeaListAuthorized}
          onCancel={() => {
            setBuyAttemptHasDeaI(null)
            setBuyAttemptHasDeaII(null)
          }}
          onAccept={() => {
            handleAddToCart(buyAttemptHasDeaI ? buyAttemptHasDeaI : buyAttemptHasDeaII, props)
            buyAttemptHasDeaI ? setBuyAttemptHasDeaI(null) : setBuyAttemptHasDeaII(null)
          }}
        />
      )}
      {buyAttemptHasDhs && (
        <DhsPopup
          permissionsToBuy={regulatoryDhsCoiAuthorized}
          onCancel={() => {
            setBuyAttemptHasDeaI(null)
            setBuyAttemptHasDeaII(null)
            setBuyAttemptHasDhs(null)
          }}
          onAccept={() => {
            if (buyAttemptHasDeaI || buyAttemptHasDeaII) {
              setBuyAttemptHasDhs(null)
            } else {
              handleAddToCart(buyAttemptHasDhs, props)
              setBuyAttemptHasDhs(null)
            }
          }}
        />
      )}
    </Container>
  )
}

BidsSent.propTypes = {
  datagrid: PropTypes.object,
  intl: PropTypes.object,
  tableHandlersFiltersBidsReceived: PropTypes.object,
  isOpenPopup: PropTypes.bool,
  loading: PropTypes.bool,
  rows: PropTypes.array,
  closePopup: PropTypes.func,
  handleVariableSave: PropTypes.func,
  acceptOffer: PropTypes.func,
  rejectOffer: PropTypes.func,
  addOfferToCart: PropTypes.func,
  deleteOffer: PropTypes.func,
  regulatoryDeaListAuthorized: PropTypes.bool,
  regulatoryDhsCoiAuthorized: PropTypes.bool
}

BidsSent.defaultProps = {
  datagrid: {},
  intl: {},
  tableHandlersFiltersBidsReceived: {},
  isOpenPopup: false,
  loading: false,
  rows: [],
  closePopup: () => {},
  handleVariableSave: () => {},
  acceptOffer: () => {},
  rejectOffer: () => {},
  addOfferToCart: () => {},
  deleteOffer: () => {},
  regulatoryDeaListAuthorized: false,
  regulatoryDhsCoiAuthorized: false
}

export default injectIntl(BidsSent)