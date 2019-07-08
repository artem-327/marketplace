import React, { Component } from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'
import { Header, Menu, Button, Checkbox, Input, Dropdown } from 'semantic-ui-react'
import * as Actions from '../actions'
import Router from 'next/router'
import { debounce } from 'lodash'
import { withDatagrid, Datagrid } from '~/modules/datagrid'

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
    BtnAddText: 'Bank Account',
    SearchText: 'Search bank account ...'
  },
  'delivery-addresses': {
    BtnAddText: 'Delivery Address',
    SearchText: 'Search delivery address ...'
  }
}

class TablesHandlers extends Component {

  constructor(props) {
    super(props)

    this.state = {
      filterValue: props.filterValue
    }

    this.handleFiltersValue = debounce(this.handleFiltersValue, 250)

  }

  handleFiltersValue = (value) => {
    const { handleFiltersValue } = this.props
    
    if (Datagrid.isReady()) Datagrid.setSearch(value)
    else handleFiltersValue(value) 
  }

  handleFilterChange = (e, { value }) => {
    this.setState({ filterValue: value })

    this.handleFiltersValue(value)
  }

  render() {
    const {
      currentTab,
      openPopup,
      openImportPopup,
      handleProductCatalogUnmappedValue,
      productCatalogUnmappedValue,
      dwollaAccount,
      openDwollaPopup,
      isCompanyAdmin,
    } = this.props

    const { filterValue } = this.state

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
                value={filterValue}
                placeholder={textsTable[currentTab.type].SearchText}
                onChange={this.handleFilterChange}
              />
            </Menu.Item>
            <Menu.Item>
              {currentTab.type === 'products' && (
                <Checkbox
                  label='Unmapped only'
                  defaultChecked={productCatalogUnmappedValue}
                  onChange={(e, { checked }) => Datagrid.setQuery({ unmappedOnly: checked })}
                />
              )}
              {isDwollaAccountVisible && (
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

export default withDatagrid(connect(
  mapStateToProps,
  Actions
)(TablesHandlers))
