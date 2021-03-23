import { memo } from 'react'
import PropTypes from 'prop-types'
import { Grid, Tab, Menu } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'

//Styles
import { StyledGrid } from '../../../../../../components/detail-row/styles'
import { GridColumnDetail } from '../../../../../my-network/components/DetailRow/DetailRow.style'
import { TabPane } from '../ListingDetail.styles'
//Components
import InfoTab from './InfoTab'
import TDSTab from './TDSTab'
import SDSTab from './SDSTab'
import DocumentsTab from './DocumentsTab'
import NotesTab from './NotesTab'

const Tabs = ({ row, activeTab, setActiveTab }) => {
  const panes = [
    {
      menuItem: (
        <Menu.Item key='info' onClick={() => setActiveTab(0)}>
          <FormattedMessage id={`sharedListings.detailRow.tabInfo`} defaultMessage='Info' />
        </Menu.Item>
      ),
      render: () => (
        <TabPane key='info' attached={false}>
          <InfoTab row={row} />
        </TabPane>
      )
    },
    {
      menuItem: (
        <Menu.Item key='tds' onClick={() => setActiveTab(1)}>
          <FormattedMessage id={`addInventory.tds`} defaultMessage='TDS' />
        </Menu.Item>
      ),
      render: () => (
        <TabPane key='tds' attached={false}>
          <TDSTab row={row} />
        </TabPane>
      )
    },
    {
      menuItem: (
        <Menu.Item key='sds' onClick={() => setActiveTab(2)}>
          <FormattedMessage id={`order.sds`} defaultMessage='SDS' />
        </Menu.Item>
      ),
      render: () => (
        <TabPane key='sds' attached={false}>
          <SDSTab row={row} />
        </TabPane>
      )
    },
    {
      menuItem: (
        <Menu.Item key='documents' onClick={() => setActiveTab(3)}>
          <FormattedMessage id={`global.documents`} defaultMessage='Documents' />
        </Menu.Item>
      ),
      render: () => (
        <TabPane key='documents' attached={false}>
          <DocumentsTab row={row} />
        </TabPane>
      )
    },
    {
      menuItem: (
        <Menu.Item key='notes' onClick={() => setActiveTab(4)}>
          <FormattedMessage id={`global.notes`} defaultMessage='Notes' />
        </Menu.Item>
      ),
      render: () => (
        <TabPane key='notes' attached={false}>
          <NotesTab row={row} />
        </TabPane>
      )
    }
  ]
  return (
    <StyledGrid>
      <Grid.Row>
        <GridColumnDetail>
          <Tab menu={{ secondary: true, pointing: true }} activeIndex={activeTab} panes={panes} />
        </GridColumnDetail>
      </Grid.Row>
    </StyledGrid>
  )
}

Tabs.propTypes = {}
Tabs.defaultProps = {}

function areEqual(prevProps, nextProps) {
  return prevProps?.row?.id === nextProps?.row?.id && prevProps?.actionTab === nextProps?.actionTab
}

const MemoTabs = memo(Tabs, areEqual)

export default MemoTabs
