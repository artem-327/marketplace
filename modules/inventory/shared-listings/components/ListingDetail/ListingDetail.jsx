import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { ChevronsUp } from 'react-feather'
// Components
import Header from './HeaderContainer'
import Tabs from './Tabs/Tabs'
// Styles
import {
  DivCollapse,
  DivIconCollapse,
  DivCollapseText,
  DivTradePassLogo
} from '../../../../my-network/components/DetailRow/DetailRow.style'

/**
 * ListingDetail Component
 * @category Inventory - Shared Listings
 * @component
 */
const ListingDetail = props => {
  const { values, onChange, parentState, datagrid, row } = props
  const { expandedRowIds, setExpandedRowIds } = parentState

  return (
    <>
      <Header
        row={row}
        values={values.header}
        onChange={data => onChange({ ...values, header: data })}
        datagrid={datagrid}
        companyType={props.companyType}
        defaultMarkup={props.defaultMarkup}
      />
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

ListingDetail.propTypes = {
  row: PropTypes.object,
  values: PropTypes.object,
  parentState: PropTypes.object,
  datagrid: PropTypes.object,
  onChange: PropTypes.func,
  downloadAttachment: PropTypes.func
}

ListingDetail.defaultProps = {
  row: {},
  values: {},
  parentState: {},
  datagrid: {},
  onChange: () => {},
  downloadAttachment: () => {}
}

export default ListingDetail
