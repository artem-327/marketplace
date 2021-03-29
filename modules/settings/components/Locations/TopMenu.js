import { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { withDatagrid, Datagrid } from '~/modules/datagrid'
import { injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'
import { Container, Menu } from 'semantic-ui-react'

class TopMenu extends Component {
  tabSwitch(tab) {
    this.props.handleLocationsTab(tab)
  }

  render() {
    const {
      activeTab,
      intl: { formatMessage }
    } = this.props

    return (
      <>
        <Container fluid style={{ padding: '0 32px' }}>
          <Menu pointing secondary horizontal>
            <Menu.Item
              style={{ textTransform: 'uppercase' }}
              name={formatMessage({
                id: 'settings.locations.menu.myCustomers',
                defaultMessage: 'My Customers'
              })}
              onClick={() => this.tabSwitch('my-customers')}
              active={!activeTab || activeTab === 'my-customers'}
              data-test='menu_settings_locations_my_customers'
            />
            <Menu.Item
              style={{ textTransform: 'uppercase' }}
              name={formatMessage({
                id: 'settings.locations.menu.pickUpLocations',
                defaultMessage: 'Warehouses'
              })}
              onClick={() => this.tabSwitch('pick-up-locations')}
              active={activeTab === 'pick-up-locations'}
              data-test='menu_settings_locations_pick_up_locations'
            />
            <Menu.Item
              style={{ textTransform: 'uppercase' }}
              name={formatMessage({
                id: 'settings.locations.menu.branches',
                defaultMessage: 'Branches'
              })}
              onClick={() => this.tabSwitch('branches')}
              active={activeTab === 'branches'}
              data-test='menu_settings_locations_branches'
            />
          </Menu>
        </Container>
      </>
    )
  }
}

const mapStateToProps = state => {
  const { settings } = state
  return {
    activeTab: settings.locationsTab
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(injectIntl(TopMenu)))
