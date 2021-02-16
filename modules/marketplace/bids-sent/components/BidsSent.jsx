/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import BidsRowDetail from '../../components/BidsRowDetail'
import { Container, Input, Image } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import ProdexGrid from '~/components/table'
import ActionCell from '~/components/table/ActionCell'
import ColumnSettingButton from '~/components/table/ColumnSettingButton'
import Tutorial from '~/modules/tutorial/Tutorial'
import { debounce } from 'lodash'
import { CustomRowDiv } from '~/modules/inventory/constants/layout'
import RowDescription from '../../components/RowDescription'
import moment from 'moment'
import confirm from '~/components/Confirmable/confirm'
import { DefaultIcon, IconWrapper, StyledName } from '../../constants/layout'
import MakeOfferPopup from '../../listings/components/MakeOfferPopup'
import Router from 'next/router'
import { getSafe } from '~/utils/functions'

// Constants
import { COLUMNS } from './BidsSent.constants'

//Components
//


//Hooks
//import { usePrevious } from '../../../hooks'



//Services
//import ErrorFocus from '../../../components/error-focus'
import {
  setInitFilters,
  handleFilterChangeInputSearch,
  getRows,
  handleUpdateFinished
} from './BidsSent.services'

const BidsSent = props => {
  const [expandedRowIds, setExpandedRowIds] = useState([])
  const [filterValues, setFilterValues] = useState({ searchInput: '' })
  const [rowDetailState, setRowDetailState] = useState(null)

  const {

  } = props

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

function mapStateToProps(store) {
  return {

  }
}

export default injectIntl(BidsSent)
//export default injectIntl(connect(mapStateToProps, {  })(BidsSent))