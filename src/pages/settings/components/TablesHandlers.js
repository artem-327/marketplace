import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Header, Menu, Button, Input, Dropdown } from 'semantic-ui-react'

import { openPopup, handleFiltersValue, openImportPopup } from '../actions'
import unitedStates from '../../../components/unitedStates'
import Router from "next/router"

const textsTable = {
  users: {
    BtnAddText: 'Add User',
    SearchText: 'Search user by name, title or branch ...'
  },
  branches: {
    BtnAddText: 'Add Branch',
    SearchText: 'Search branch by name, address or contact ...'
  },
  warehouses: {
    BtnAddText: 'Add Warehouse',
    SearchText: 'Search warehouse by name, address or contact ...'
  },
  products: {
    BtnAddText: 'Add Product Catalog',
    SearchText: 'Search product catalog by name, number ...'
  },
  'global-broadcast': {
    BtnAddText: 'Add Global Broadcast',
    SearchText: 'Search global broadcast by name ...'
  },
  'credit-cards': {
    BtnAddText: 'Add Credit Card',
    SearchText: 'Search credit card ...'
  },
  'bank-accounts': {
    BtnAddText: 'Add Bank Account',
    SearchText: 'Search bank account ...'
  },
  'delivery-addresses': {
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
      case 'Users': return 'User'
      case 'Branches': return 'Branch'
      case 'Warehouses': return 'Warehouse'
      case 'Product catalog': return 'Product'
      case 'Global Broadcast': return 'Broadcast'
      case 'Credit cards': return 'Credit card'
      case 'Bank accounts': return 'Bank account'
      case 'Delivery addresses': return 'Delivery addresses'
      default: null
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
            {currentTab.name}
          </Header>
        </Menu.Item>
        {!currentTab.hideHandler &&
          <Menu.Menu position="right">
            <Menu.Item>
              <Input
                style={{ width: 340 }}
                size="large"
                icon="search"
                placeholder={textsTable[currentTab.type].SearchText}
                onChange={e => handleFiltersValue(this.props, e.target.value)}
              />
            </Menu.Item>
            <Menu.Item>
              <Button size="large" primary onClick={() => openPopup()}>
                Add {this.currentTabTitle(currentTab.name)}
              </Button>
              {currentTab.type === 'products' && (
                <Button
                  size="large"
                  style={{ marginLeft: 10 }}
                  primary
                  onClick={() => openImportPopup()}>
                  Import {this.currentTabTitle(currentTab.name)}
                </Button>
              )}
            </Menu.Item>
          </Menu.Menu>
        }
      </Menu>
    )
  }
}

const mapStateToProps = state => {
  return {
    deliveryAddressesFilter: state.settings.deliveryAddressesFilter,
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
