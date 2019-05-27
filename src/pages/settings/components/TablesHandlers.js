import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Header, Menu, Button, Input, Dropdown } from 'semantic-ui-react'

import { openPopup, handleFiltersValue, openImportPopup } from '../actions'
import unitedStates from '../../../components/unitedStates'

const textsTable = {
  Users: {
    BtnAddText: 'Add User',
    SearchText: 'Search user by name, title or branch ...'
  },
  Branches: {
    BtnAddText: 'Add Branch',
    SearchText: 'Search branch by name, address or contact ...'
  },
  Warehouses: {
    BtnAddText: 'Add Warehouse',
    SearchText: 'Search warehouse by name, address or contact ...'
  },
  'Product catalog': {
    BtnAddText: 'Add Product Catalog',
    SearchText: 'Search product catalog by name, number ...'
  },
  'Global Broadcast': {
    BtnAddText: 'Add Global Broadcast',
    SearchText: 'Search global broadcast by name ...'
  },
  'Credit cards': {
    BtnAddText: 'Add Credit Card',
    SearchText: 'Search credit card ...'
  },
  'Bank accounts': {
    BtnAddText: 'Add Bank Account',
    SearchText: 'Search bank account ...'
  },
  'Delivery addresses': {
    BtnAddText: 'Add Delivery Address',
    SearchText: 'Search delivery address ...'
  }
}

class TablesHandlers extends Component {
  state = {
    filterFieldCurrentValue: 'None'
  }

  handleChangeSelectField = (event, value) => {
    this.setState({
      filterFieldCurrentValue: value
    })
  }

  handleChangeFieldsCurrentValue = fieldStateName => event => {
    this.setState({
      [fieldStateName]: event.target.value
    })
  }

  currentTabTitle = currentTab => {
    switch (currentTab) {
      case 'Users':
        return 'User'
        break
      case 'Branches':
        return 'Branch'
        break
      case 'Warehouses':
        return 'Warehouse'
        break
      case 'Product catalog':
        return 'Product'
        break
      case 'Credit cards':
        return 'Credit card'
        break
      case 'Bank accounts':
        return 'Bank account'
        break
      case 'Delivery addresses':
        return 'Delivery addresses'
        break
      default:
        null
    }
  }

  render() {
    const {
      handleFiltersValue,
      currentTab,
      openPopup,
      openImportPopup
    } = this.props

    const { filterFieldCurrentValue } = this.state

    return (
      <Menu secondary>
        <Menu.Item header>
          <Header as="h1" size="medium">
            {currentTab}
          </Header>
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item>
            <Input
              style={{ width: 340 }}
              size="large"
              icon="search"
              placeholder={textsTable[currentTab].SearchText}
              onChange={e => handleFiltersValue(this.props, e.target.value)}
            />
          </Menu.Item>
          <Menu.Item>
            <Button size="large" primary onClick={() => openPopup()}>
              Add {this.currentTabTitle(currentTab)}
            </Button>
            {currentTab === 'Product catalog' && (
              <Button
                size="large"
                style={{ marginLeft: 10 }}
                primary
                onClick={() => openImportPopup()}
              >
                Import {this.currentTabTitle(currentTab)}
              </Button>
            )}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentTab: state.settings.currentTab,
    deliveryAddressesFilter: state.settings.deliveryAddressesFilter
  }
}

const mapDispatchToProps = {
  openPopup,
  handleFiltersValue,
  openImportPopup
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TablesHandlers)
