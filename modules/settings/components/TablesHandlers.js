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
    BtnAddText: "settings.tables.users.buttonAdd",
    SearchText: "settings.tables.users.search"
  },
  'branches': {
    BtnAddText: "settings.tables.branches.buttonAdd",
    SearchText: "settings.tables.branches.search"
  },
  'warehouses': {
    BtnAddText: "settings.tables.warehouses.buttonAdd",
    SearchText: "settings.tables.warehouses.search"
  },
  'products': {
    BtnAddText: "settings.tables.products.buttonAdd",
    BtnImportText: "settings.tables.products.buttonImport",
    SearchText: "settings.tables.products.search"
  },
  'global-broadcast': {
    BtnAddText: "settings.tables.globalBroadcast.buttonAdd",
    SearchText: "settings.tables.globalBroadcast.search"
  },
  'credit-cards': {
    BtnAddText: "settings.tables.creditCards.buttonAdd",
    SearchText: "settings.tables.creditCards.search"
  },
  'bank-accounts': {
    BtnAddText: "settings.tables.bankAccounts.buttonAdd",
    SearchText: "settings.tables.bankAccounts.search"
  },
  'delivery-addresses': {
    BtnAddText: "settings.tables.deliveryAddresses.buttonAdd",
    SearchText: "settings.tables.deliveryAddresses.search"
  },
  'logistics': {
    BtnAddText: "settings.tables.logistics.buttonAdd",
    SearchText: "settings.tables.logistics.search"
  },
  'documents': {
    BtnAddText: "settings.tables.documents.buttonAdd",
    SearchText: "settings.tables.documents.search"
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
      openUploadDocumentsPopup,
      // handleProductCatalogUnmappedValue,
      productCatalogUnmappedValue,
      openDwollaPopup,
      dwollaAccBalance,
      // openGlobalBroadcast,
      bankAccounts,
      intl: { formatMessage }
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
                  placeholder={formatMessage({
                    id: textsTable[currentTab.type].SearchText,
                    defaultMessage: 'Select Credit Card'
                  })}
                  onChange={this.handleFilterChange}
                />
              </Menu.Item>
            }
            <Menu.Item>
              {currentTab.type === 'products' && (
                <Checkbox
                  label={formatMessage({ id: 'settings.tables.products.unmappedOnly', defaultMessage: 'Unmapped only' })}
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
                  <FormattedMessage id='settings.tables.bankAccounts.registerDwolla' defaultMessage='Register Dwolla Account' >{(text) => text}</FormattedMessage>
                </Button>
              )}
              {(bankAccTab && bankAccounts.uploadDocumentsButton) && (
                <Button
                  size="large"
                  style={{ marginLeft: 10 }}
                  primary
                  onClick={() => openUploadDocumentsPopup()}
                  data-test='settings_dwolla_upload_documents_btn'
                >
                  <FormattedMessage id='settings.tables.bankAccounts.uploadDoc' defaultMessage='Upload Documents' >{(text) => text}</FormattedMessage>
                </Button>
              )}
              {(bankAccTab && bankAccounts.dwollaBalance) && (
                <>
                  &nbsp;<FormattedMessage id='settings.dwollaAccBalance' defaultMessage='Dwolla Balance: ' />&nbsp;
                  <FormattedNumber style='currency' currency={dwollaAccBalance.currency} value={dwollaAccBalance.value} />
                </>
              )}
              {!currentTab.hideButtons && (
                <>
                  {(!bankAccTab || bankAccounts.addButton) && (
                    <Button
                      size="large"
                      style={{ marginLeft: 10 }}
                      primary
                      onClick={() => openPopup()}
                      data-test='settings_open_popup_btn'
                    >
                      <FormattedMessage id={textsTable[currentTab.type].BtnAddText}>{(text) => text}</FormattedMessage>
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
                      <FormattedMessage id={textsTable[currentTab.type].BtnImportText}>{(text) => text}</FormattedMessage>
                    </Button>
                  )}
                </>
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
  //const dwollaAccountStatus = company && company.dwollaAccountStatus || 'none'
  const dwollaAccountStatus = 'document'

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
