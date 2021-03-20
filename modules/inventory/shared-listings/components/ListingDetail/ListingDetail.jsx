/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { ChevronsUp } from 'react-feather'

// Components
//import ErrorFocus from '../../../components/error-focus'
import Header from './Header'
import Tabs from './Tabs/Tabs'
// Hooks
//import { usePrevious } from '../../../hooks'

// Styles
import { TabPane } from './ListingDetail.styles'
import { StyledGrid } from '../../../../../components/detail-row/styles'
import {
  DivCollapse,
  DivIconCollapse,
  DivCollapseText,
  DivTradePassLogo
} from '../../../../my-network/components/DetailRow/DetailRow.style'

// Services
//import {} from './ListingDetail.services'

const ListingDetail = props => {
  const [tmp, set] = useState(false)

  const { parentState, row, setActiveTab, activeTab } = props

  const { expandedRowIds, setExpandedRowIds } = parentState

  console.log('!!!!!!!!!! ListingDetail props', props)

  return (
    <>
      <Header row={row} />
      <Tabs id={row.id} activeTab={activeTab} setActiveTab={setActiveTab} />
      <DivCollapse
        onClick={() => {
          let ids = expandedRowIds.slice()
          if (ids.includes(row.id)) {
            setActiveTab(0)
            setExpandedRowIds([])
          }
        }}
        data-test='shared_listings_detail_close_btn'>
        <div>
          <DivIconCollapse>
            <ChevronsUp size='18' />
          </DivIconCollapse>
          <DivCollapseText>Collapse</DivCollapseText>
        </div>
        <DivTradePassLogo>Close</DivTradePassLogo>
      </DivCollapse>
    </>
  )
}

ListingDetail.propTypes = {
  //PropTypes.number
}

ListingDetail.defaultProps = {}

function areEqual(prevProps, nextProps) {
  return prevProps?.row?.id === nextProps?.row?.id && prevProps?.activeTab === nextProps?.activeTab
}

//export default injectIntl(ListingDetail)
export default memo(ListingDetail, areEqual)
