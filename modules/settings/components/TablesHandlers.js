import React, { Component } from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'
import {
  Header,
  Menu,
  Button,
  Checkbox,
  Input,
  Dropdown,
  Grid,
  GridRow,
  GridColumn
} from 'semantic-ui-react'
import { debounce } from 'lodash'
import Router from 'next/router'

import * as Actions from '../actions'
import { openGlobalBroadcast } from '~/modules/broadcast/actions'
import { withDatagrid, Datagrid } from '~/modules/datagrid'
import { FormattedNumber, FormattedMessage, injectIntl } from 'react-intl'
import { bankAccountsConfig } from './BankAccountsTable/BankAccountsTable'
import { currency } from '~/constants/index'
import { SETTINGS_CLOSE_UPLOAD_DOCUMENTS_POPUP_FULFILLED } from '../action-types'

const textsTable = {
  users: {
    BtnAddText: 'settings.tables.users.buttonAdd',
    SearchText: 'settings.tables.users.search'
  },
  branches: {
    BtnAddText: 'settings.tables.branches.buttonAdd',
    SearchText: 'settings.tables.branches.search'
  },
  warehouses: {
    BtnAddText: 'settings.tables.warehouses.buttonAdd',
    SearchText: 'settings.tables.warehouses.search'
  },
  products: {
    BtnAddText: 'settings.tables.products.buttonAdd',
    BtnImportText: 'settings.tables.products.buttonImport',
    SearchText: 'settings.tables.products.search'
  },
  'global-broadcast': {
    BtnAddText: 'settings.tables.globalBroadcast.buttonAdd',
    SearchText: 'settings.tables.globalBroadcast.search'
  },
  'credit-cards': {
    BtnAddText: 'settings.tables.creditCards.buttonAdd',
    SearchText: 'settings.tables.creditCards.search'
  },
  'bank-accounts': {
    BtnAddText: 'settings.tables.bankAccounts.buttonAdd',
    SearchText: 'settings.tables.bankAccounts.search'
  },
  'delivery-addresses': {
    BtnAddText: 'settings.tables.deliveryAddresses.buttonAdd',
    SearchText: 'settings.tables.deliveryAddresses.search'
  },
  logistics: {
    BtnAddText: 'settings.tables.logistics.buttonAdd',
    SearchText: 'settings.tables.logistics.search'
  },
  documents: {
    BtnAddText: 'settings.tables.documents.buttonAdd',
    SearchText: 'settings.tables.documents.search'
  }
}
const listDocumentTypes = [
  {
    id: 10,
    name: 'Bill of Lading',
    editable: false
  },
  {
    id: 1,
    name: 'Certificate of Analysis',
    editable: false
  },
  {
    id: 5,
    name: 'Certificate of Origin',
    editable: false
  },
  {
    id: 9,
    name: 'Corporate Audit',
    editable: false
  },
  {
    id: 6,
    name: 'Kosher Certificate',
    editable: false
  },
  {
    id: 7,
    name: 'Non GMO',
    editable: false
  },
  {
    id: 8,
    name: 'Product Audit',
    editable: false
  },
  {
    id: 4,
    name: 'Product Image',
    editable: false
  },
  {
    id: 3,
    name: 'Safety Data Sheet',
    editable: false
  },
  {
    id: 2,
    name: 'Specification Sheet',
    editable: false
  },
  {
    id: 11,
    name: 'Technical Data Sheet',
    editable: false
  }
]

class TablesHandlers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterFieldCurrentValue: 'None',
      filterValue: ''
    }
    this.handleFiltersValue = debounce(this.handleFiltersValue, 250)
  }

  async componentDidMount() {
    const { documentTypes, getDocumentTypes } = this.props
    if (!documentTypes || documentTypes.length === 0) await getDocumentTypes()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.currentTab !== this.props.currentTab) {
      this.setState({ filterValue: '' })
      this.handleFiltersValue('')
    }
  }

  handleFiltersValue = value => {
    const { handleFiltersValue } = this.props

    if (Datagrid.isReady()) Datagrid.setSearch(value)
    else handleFiltersValue(value)
  }

  handleFilterChange = (e, { value }) => {
    this.setState({ filterValue: value })

    this.handleFiltersValue(value)
  }

  renderHeader = () => (
    <GridColumn widescreen={2} computer={3} tablet={3}>
      <Header as='h1' size='medium'>
        {this.props.currentTab.name}
      </Header>
    </GridColumn>
  )

  renderHandler = () => {
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
      <>
        {currentTab.type === 'documents' && (
          <GridColumn floated='right' computer={3} tablet={4}>
            <Dropdown
              placeholder={formatMessage({
                id: 'settings.tables.documents.dropdown',
                defaultMessage: 'Choose document type'
              })}
              fluid
              selection
              options={
                this.props &&
                this.props.documentTypes.length > 0 &&
                this.props.documentTypes.map(document => ({
                  key: document.key,
                  text: document.text,
                  value: document.value
                }))
              }
              onChange={this.handleFiltersValue}
            />
          </GridColumn>
        )}
        <GridColumn floated='right' widescreen={7} computer={5} tablet={4}>
          <Input
            fluid
            icon='search'
            value={filterValue}
            placeholder={formatMessage({
              id: textsTable[currentTab.type].SearchText,
              defaultMessage: 'Select Credit Card'
            })}
            onChange={this.handleFilterChange}
          />
        </GridColumn>

        {currentTab.type === 'products' && (
          <GridColumn computer={2} tablet={3}>
            <Checkbox
              label={formatMessage({
                id: 'settings.tables.products.unmappedOnly',
                defaultMessage: 'Unmapped only'
              })}
              defaultChecked={productCatalogUnmappedValue}
              onChange={(e, { checked }) =>
                Datagrid.setQuery({ unmappedOnly: checked })
              }
              data-test='settings_dwolla_unmapped_only_chckb'
            />
          </GridColumn>
        )}
        {bankAccTab && bankAccounts.registerButton && (
          <GridColumn computer={3} tablet={4}>
            <Button
              primary
              onClick={() => Router.push('/dwolla-register')}
              data-test='settings_dwolla_open_popup_btn'>
              <FormattedMessage
                id='settings.tables.bankAccounts.registerDwolla'
                defaultMessage='Register Dwolla Account'>
                {text => text}
              </FormattedMessage>
            </Button>
          </GridColumn>
        )}
        {bankAccTab && bankAccounts.uploadDocumentsButton && (
          <GridColumn>
            <Button
              primary
              onClick={() => openUploadDocumentsPopup()}
              data-test='settings_dwolla_upload_documents_btn'>
              <FormattedMessage
                id='settings.tables.bankAccounts.uploadDoc'
                defaultMessage='Upload Documents'>
                {text => text}
              </FormattedMessage>
            </Button>
          </GridColumn>
        )}
        {bankAccTab && bankAccounts.dwollaBalance && (
          <GridColumn computer={2}>
            <FormattedMessage
              id='settings.dwollaAccBalance'
              defaultMessage='Dwolla Balance: '
            />
            <FormattedNumber
              style='currency'
              currency={dwollaAccBalance.currency}
              value={dwollaAccBalance.value}
            />
          </GridColumn>
        )}
        {!currentTab.hideButtons && (
          <>
            {(!bankAccTab || bankAccounts.addButton) && (
              <GridColumn widescreen={2} computer={2} tablet={3}>
                <Button
                  fluid
                  primary
                  onClick={() => openPopup()}
                  data-test='settings_open_popup_btn'>
                  <FormattedMessage id={textsTable[currentTab.type].BtnAddText}>
                    {text => text}
                  </FormattedMessage>
                </Button>
              </GridColumn>
            )}
            {currentTab.type === 'products' && (
              <GridColumn widescreen={2} computer={2} tablet={3}>
                <Button
                  fluid
                  primary
                  onClick={() => openImportPopup()}
                  data-test='settings_open_import_popup_btn'>
                  <FormattedMessage
                    id={textsTable[currentTab.type].BtnImportText}>
                    {text => text}
                  </FormattedMessage>
                </Button>
              </GridColumn>
            )}
          </>
        )}
      </>
    )
  }

  render() {
    return (
      <Grid as={Menu} secondary verticalAlign='middle'>
        <GridRow>
          {this.renderHeader()}
          {!this.props.currentTab.hideHandler && this.renderHandler()}
        </GridRow>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  const company = get(state, 'auth.identity.company', null)
  const dwollaAccountStatus = (company && company.dwollaAccountStatus) || 'none'
  //const dwollaAccountStatus = 'document'

  return {
    documentTypes: state.settings.documentTypes,
    bankAccounts: bankAccountsConfig[dwollaAccountStatus],
    currentTab: state.settings.currentTab,
    productCatalogUnmappedValue: state.settings.productCatalogUnmappedValue,
    deliveryAddressesFilter: state.settings.deliveryAddressesFilter,
    productsFilter: state.settings.productsFilter,
    filterValue: state.settings.filterValue,
    dwollaAccBalance: state.settings.dwollaAccBalance
      ? state.settings.dwollaAccBalance.balance
      : { value: '', currency }
  }
}

export default withDatagrid(
  connect(
    mapStateToProps,
    { ...Actions, openGlobalBroadcast }
  )(injectIntl(TablesHandlers))
)
