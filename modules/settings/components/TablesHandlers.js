import React, { Component } from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'
import { Header, Menu, Button, Checkbox, Input, Dropdown } from 'semantic-ui-react'
import * as Actions from '../actions'
import { openGlobalBroadcast } from '~/modules/broadcast/actions'
import Router from 'next/router'
import { debounce } from 'lodash'
import { withDatagrid, Datagrid } from '~/modules/datagrid'
import { FormattedNumber, FormattedMessage, injectIntl } from 'react-intl'
import { bankAccountsConfig } from './BankAccountsTable/BankAccountsTable'

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
    BtnAddText: 'Global Price Book',
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
  },
  'logistics': {
    BtnAddText: 'Logistics',
    SearchText: 'Search logistics ...'
  }
}

class TablesHandlers extends Component {

  constructor(props) {
    super(props)

    this.state = {
      filterFieldCurrentValue: 'None',
      filterValue: ''
    }
    this.handleFiltersValue = debounce(this.handleFiltersValue, 250)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.currentTab !== this.props.currentTab) {
      this.setState({ filterValue: '' })
      this.handleFiltersValue('')
    }
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
      openDwollaPopup,
      dwollaAccBalance,
      openGlobalBroadcast,
      bankAccounts
    } = this.props

    const { filterValue } = this.state
    const bankAccTab = currentTab.type === 'bank-accounts'

    return (
      <Menu secondary>
        <Menu.Item header>
          <Header as="h1" size="medium">
            {currentTab.name}
          </Header>
        </Menu.Item>
        {!currentTab.hideHandler &&
          <Menu.Menu position="right">
            {!currentTab.hideSearch && (!bankAccTab || bankAccounts.searchField) &&
              <Menu.Item data-test='settings_table_search_inp' >
                <Input
                  style={{ width: 340 }}
                  size="large"
                  icon="search"
                  value={filterValue}
                  placeholder={textsTable[currentTab.type].SearchText}
                  onChange={this.handleFilterChange}
                />
              </Menu.Item>
            }
            <Menu.Item>
              {currentTab.type === 'products' && (
                <Checkbox
                  label='Unmapped only'
                  defaultChecked={productCatalogUnmappedValue}
                  onChange={(e, { checked }) => Datagrid.setQuery({ unmappedOnly: checked })}
                  data-test='settings_dwolla_unmapped_only_chckb'
                />
              )}
              {(bankAccTab && bankAccounts.registerButton) && (
                <Button
                  size="large"
                  style={{ marginLeft: 10 }}
                  primary
                  onClick={() => openDwollaPopup()}
                  data-test='settings_dwolla_open_popup_btn'
                >
                  Register Dwolla Account
              </Button>
              )}
              {(bankAccTab && bankAccounts.uploadDocumentsButton) && (
                <Button
                  size="large"
                  style={{ marginLeft: 10 }}
                  primary
                  data-test='settings_dwolla_upload_documents_btn'
                >
                  Upload Documents
                </Button>
              )}
              {(bankAccTab && bankAccounts.dwollaBalance) && (
                <>
                  &nbsp;<FormattedMessage id='settings.dwollaAccBalance' defaultMessage='Dwolla Balance: ' />&nbsp;
                  <FormattedNumber style='currency' currency={dwollaAccBalance.currency} value={dwollaAccBalance.value} />
                </>
              )}
              {(!bankAccTab || bankAccounts.addButton) && (
                <Button
                  size="large"
                  style={{marginLeft: 10}}
                  primary
                  onClick={() => {
                    if (currentTab.type === 'global-broadcast') openGlobalBroadcast()
                    else openPopup()
                  }}
                  data-test='settings_open_popup_btn'
                >
                  Add {textsTable[currentTab.type].BtnAddText}
                </Button>
              )}
              {currentTab.type === 'products' && (
                <Button
                  size="large"
                  style={{ marginLeft: 10 }}
                  primary
                  onClick={() => openImportPopup()}
                  data-test='settings_open_import_popup_btn'
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
  // ! ! Temporary, until 'dwollaAccountStatus' is returned from BE
  const dwollaAccountStatus = company && company.dwollaAccountStatus ? company.dwollaAccountStatus : (company && company.hasDwollaAccount ? 'verified' : 'none')

  return {
    bankAccounts: bankAccountsConfig[dwollaAccountStatus],
    currentTab: state.settings.currentTab,
    productCatalogUnmappedValue: state.settings.productCatalogUnmappedValue,
    deliveryAddressesFilter: state.settings.deliveryAddressesFilter,
    productsFilter: state.settings.productsFilter,
    filterValue: state.settings.filterValue,
    dwollaAccBalance: state.settings.dwollaAccBalance ?
      state.settings.dwollaAccBalance.balance : { value: '', currency: 'USD' },
  }
}

export default withDatagrid(connect(
  mapStateToProps,
  { ...Actions, openGlobalBroadcast }
)(injectIntl(TablesHandlers)))
