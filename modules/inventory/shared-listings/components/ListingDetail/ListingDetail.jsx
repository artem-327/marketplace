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
  const { values, onChange } = props
  const { parentState, row } = props
  const { expandedRowIds, setExpandedRowIds } = parentState

  return (
    <>
      <Header
        row={row}
        values={values.header}
        onChange={data => onChange({ ...values, header: data })}
      />
      <Tabs
        id={row.id}
        activeTab={values.tabs.activeTab}
        setActiveTab={data => onChange({ ...values, tabs: { activeTab: data } })
        }
      />
      <DivCollapse
        onClick={() => {
          let ids = expandedRowIds.slice()
          if (ids.includes(row.id)) {
            onChange({ ...values, tabs: { activeTab: data }})
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
