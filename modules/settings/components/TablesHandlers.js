import React, { Component } from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'
import { Header, Menu, Button, Checkbox, Input, Dropdown } from 'semantic-ui-react'
import { openPopup, openDwollaPopup, handleFiltersValue, openImportPopup, handleProductCatalogUnmappedValue } from '../actions'
import Router from 'next/router'

const textsTable = {
  'users': {
    BtnAddText: 'User',
    SearchText: 'Search user by name, title or branch ...'
  },
  'branches': {
    BtnAddText: 'Branch',
    SearchText: 'Search branch by name, address or contact ...'
  },
  'warehouses': {
    BtnAddText: 'Warehouse',
    SearchText: 'Search warehouse by name, address or contact ...'
  },
  'products': {
    BtnAddText: 'Product',
    BtnImportText: 'Products',
    SearchText: 'Search product catalog by name, number ...'
  },
  'global-broadcast': {
    BtnAddText: 'Global broadcast',
    SearchText: 'Search global broadcast by name ...'
  },
  'credit-cards': {
    BtnAddText: 'Credit card',
    SearchText: 'Search credit card ...'
  },
  'bank-accounts': {
    BtnAddText: 'Bank account',
    SearchText: 'Search bank account ...'
  },
  'delivery-addresses': {
    BtnAddText: 'Delivery Address',
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

  render() {
    const {
      handleFiltersValue,
      currentTab,
      openPopup,
      openImportPopup,
      handleProductCatalogUnmappedValue,
      productCatalogUnmappedValue,
      dwollaAccount,
      openDwollaPopup,
      isCompanyAdmin
    } = this.props

    const { filterFieldCurrentValue } = this.state
    const isDwollaAccountVisible = isCompanyAdmin && dwollaAccount && !dwollaAccount.hasDwollaAccount && currentTab.type === 'bank-accounts'

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
            {currentTab.type === 'products' && (
              <Checkbox
                label='Unmapped only'
                defaultChecked={productCatalogUnmappedValue}
                onChange={(e, { checked }) => handleProductCatalogUnmappedValue(checked, this.props)}
              />
            )}
            { isDwollaAccountVisible &&  (
              <Button
                size="large"
                style={{ marginLeft: 10 }}
                primary
                onClick={() => openDwollaPopup()}
              >
                Register Dwolla Account
              </Button>
            )}
            <Button
              size="large"
              style={{ marginLeft: 10 }}
              primary
              onClick={() => openPopup()}
            >
              Add {textsTable[currentTab.type].BtnAddText}
            </Button>
            {currentTab.type === 'products' && (
              <Button
                size="large"
                style={{ marginLeft: 10 }}
                primary
                onClick={() => openImportPopup()}
              >
                Import {textsTable[currentTab.type].BtnImportText}
              </Button>
            )}
          </Menu.Item>
        </Menu.Menu>
        }
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  const company = get(state, 'auth.identity.company', null)
  const isCompanyAdmin = get(state, 'auth.identity.isCompanyAdmin', null)
  return {
    dwollaAccount: company,
    isCompanyAdmin,
    currentTab: Router && Router.router ? state.settings.tabsNames.find(tab => tab.type === Router.router.query.type) || state.settings.tabsNames[0] : state.settings.tabsNames[0],

    productCatalogUnmappedValue: state.settings.productCatalogUnmappedValue,
    deliveryAddressesFilter: state.settings.deliveryAddressesFilter,
    productsFilter: state.settings.productsFilter,
    filterValue: state.settings.filterValue,
  }
}

const mapDispatchToProps = {
  openPopup,
  openDwollaPopup,
  handleFiltersValue,
  openImportPopup,
  handleProductCatalogUnmappedValue
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TablesHandlers)
