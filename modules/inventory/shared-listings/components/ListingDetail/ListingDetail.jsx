/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Grid, Tab, Menu } from 'semantic-ui-react'
import { ChevronsUp } from 'react-feather'

// Components
//import ErrorFocus from '../../../components/error-focus'
import Header from './Header'
import InfoTab from './Tabs/InfoTab'
// Hooks
//import { usePrevious } from '../../../hooks'

// Styles
import { TabPane } from './ListingDetail.styles'
import { StyledGrid } from '../../../../../components/detail-row/styles'
import {
  GridColumnDetail,
  DivCollapse,
  DivIconCollapse,
  DivCollapseText,
  DivTradePassLogo
} from '../../../../my-network/components/DetailRow/DetailRow.style'

// Services
//import {} from './ListingDetail.services'

const ListingDetail = props => {
  const [tmp, set] = useState(false)

  const [activeTab, setActiveTab] = useState(0)

  const { parentState, row, intl } = props

  const { expandedRowIds, setExpandedRowIds } = parentState

  // Similar to call componentDidMount:
  useEffect(() => {}, []) // If [] is empty then is similar as componentDidMount.

  // This useEffect is used similar as componentDidUpdate
  // Could by used in previous (above) useEffect, but this approach is more clear
  useEffect(() => {}, [
    /* variableName */
  ])

  console.log('!!!!!!!!!! ListingDetail props', props)

  const panes = [
    {
      menuItem: (
        <Menu.Item key='info' onClick={() => setActiveTab(0)}>
          {intl.formatMessage({ id: 'sharedListings.detailRow.tabInfo', defaultMessage: 'Info' })}
        </Menu.Item>
      ),
      render: () => (
        <TabPane key='info' attached={false}>
          <InfoTab />
        </TabPane>
      )
    },
    {
      menuItem: (
        <Menu.Item key='info' onClick={() => setActiveTab(1)}>
          {intl.formatMessage({ id: 'global.tds', defaultMessage: 'TDS' })}
        </Menu.Item>
      ),
      render: () => (
        <TabPane key='info' attached={false}>
          Ahoj
        </TabPane>
      )
    },
    {
      menuItem: (
        <Menu.Item key='info' onClick={() => setActiveTab(2)}>
          {intl.formatMessage({ id: 'global.sds', defaultMessage: 'SDS' })}
        </Menu.Item>
      ),
      render: () => (
        <TabPane key='info' attached={false}>
          Ahoj
        </TabPane>
      )
    },
    {
      menuItem: (
        <Menu.Item key='info' onClick={() => setActiveTab(3)}>
          {intl.formatMessage({ id: 'global.documents', defaultMessage: 'Documents' })}
        </Menu.Item>
      ),
      render: () => (
        <TabPane key='info' attached={false}>
          Ahoj
        </TabPane>
      )
    },
    {
      menuItem: (
        <Menu.Item key='info' onClick={() => setActiveTab(4)}>
          {intl.formatMessage({ id: 'global.notes', defaultMessage: 'Notes' })}
        </Menu.Item>
      ),
      render: () => (
        <TabPane key='info' attached={false}>
          Ahoj
        </TabPane>
      )
    }
  ]

  return (
    <>
      <Header row={row} intl={intl} />
      <StyledGrid>
        <Grid.Row>
          <GridColumnDetail>
            <Tab menu={{ secondary: true, pointing: true }} activeIndex={activeTab} panes={panes} />
          </GridColumnDetail>
        </Grid.Row>
      </StyledGrid>
      <DivCollapse
        onClick={() => {
          let ids = expandedRowIds.slice()
          if (ids.includes(row.id)) {
            setExpandedRowIds(ids.filter(id => id !== row.id))
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

function mapStateToProps(store) {
  return {}
}

//export default injectIntl(ListingDetail)
export default injectIntl(connect(mapStateToProps, {})(ListingDetail))
