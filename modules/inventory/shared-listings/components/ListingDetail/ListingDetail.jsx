/* eslint-disable react-hooks/exhaustive-deps */
import { Component, memo, useState } from 'react'
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
import { render } from 'nprogress'

// Services
//import {} from './ListingDetail.services'

class ListingDetail extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props?.row?.id !== nextProps?.row?.id
  }

  render() {
    const { values, onChange, parentState, row } = this.props
    const { expandedRowIds, setExpandedRowIds } = parentState
    return (
      <>
        <Header row={row} values={values.header} onChange={data => onChange({ ...values, header: data })} />
        <Tabs
          row={row}
          activeTab={values?.tabs?.activeTab}
          setActiveTab={data => onChange({ ...values, tabs: { activeTab: data } })}
        />
        <DivCollapse
          onClick={() => {
            let ids = expandedRowIds.slice()
            if (ids.includes(row.id)) {
              onChange({
                ...values,
                header: { priceMultiplier: '', priceAddition: '', priceOverride: '', id: '' },
                tabs: { activeTab: 0 }
              })
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
}

ListingDetail.propTypes = {
  //PropTypes.number
}

ListingDetail.defaultProps = {}

export default ListingDetail
