import React, { Component } from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'
import { Header, Menu, Button, Checkbox, Input, Dropdown, Grid, GridRow, GridColumn } from 'semantic-ui-react'
import { debounce } from 'lodash'
import Router from 'next/router'
import styled from 'styled-components'
import TreeModel from 'tree-model'
import { withToastManager } from 'react-toast-notifications'

import * as Actions from '../actions'
import { openGlobalBroadcast, saveRules, initGlobalBroadcast } from '~/modules/broadcast/actions'
import { withDatagrid, Datagrid } from '~/modules/datagrid'
import { FormattedNumber, FormattedMessage, injectIntl } from 'react-intl'
import { bankAccountsConfig } from './BankAccountsTable/BankAccountsTable'
import { currency } from '~/constants/index'
import { SETTINGS_CLOSE_UPLOAD_DOCUMENTS_POPUP_FULFILLED } from '../action-types'
import { generateToastMarkup } from '~/utils/functions'
import { PlusCircle, UploadCloud } from 'react-feather'

const PositionHeaderSettings = styled.div`
  position: relative;
  z-index: 602;
`

const CustomButton = styled(Button)`
  background-color: #2599d5 !important;
  color: #ffffff !important;
  align-items: center !important;
  display: flex !important;
`

const CustomIcon = styled(PlusCircle)`
  margin-right: 10px;
`

const CustomUploadCloud = styled(UploadCloud)`
  margin-right: 10px;
`

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

class TablesHandlers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterFieldCurrentValue: 'None',
      filterValue: '',
      options: []
    }
    this.handleFiltersValue = debounce(this.handleFiltersValue, 250)
  }

  async componentDidMount() {
    const { documentTypes, getDocumentTypes, initGlobalBroadcast } = this.props
    try {
      await initGlobalBroadcast()
    } catch (err) {
      console.error(err)
    }
    if (!documentTypes || documentTypes.length === 0) {
      try {
        await getDocumentTypes()
      } catch (err) {
        console.error(err)
      }
    }
    this.setState({
      options: [
        {
          key: 'All document types',
          text: (
            <FormattedMessage
              id='settings.tables.documents.dropdown.all.document.types'
              defaultMessage='All document types'>
              {text => text}
            </FormattedMessage>
          ),
          values: 'All document types'
        },
        ...this.props.documentTypes.map(document => ({
          key: document.key,
          text: document.text,
          value: document.text
        }))
      ]
    })
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

  handleFilterChangeDocumentType = (e, { value }) => {
    this.handleFiltersValue(value)
  }

  saveRulesBroadcast = async (model, toastManager) => {
    try {
      await this.props.saveRules(null, model)
      toastManager.add(generateToastMarkup('Saved successfully!', 'New broadcast rules have been saved.'), {
        appearance: 'success'
      })
    } catch (e) {
      console.error(e)
    }
  }

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
      treeData,
      toastManager,
      openSidebar,
      intl: { formatMessage }
    } = this.props

    const { filterValue } = this.state
    const bankAccTab = currentTab.type === 'bank-accounts'
    return (
      <>
        {currentTab.type !== 'global-broadcast' && (
          <GridColumn floated='left' widescreen={7} computer={5} tablet={4}>
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
        )}

        {currentTab.type === 'documents' && (
          <GridColumn floated='right' computer={4} tablet={4}>
            <Dropdown
              placeholder={formatMessage({
                id: 'settings.tables.documents.dropdown',
                defaultMessage: 'Choose document type'
              })}
              fluid
              selection
              options={this.state.options}
              onChange={this.handleFilterChangeDocumentType}
            />
          </GridColumn>
        )}

        {currentTab.type === 'products' && (
          <GridColumn computer={2} tablet={3}>
            <Checkbox
              label={formatMessage({
                id: 'settings.tables.products.unmappedOnly',
                defaultMessage: 'Unmapped only'
              })}
              defaultChecked={productCatalogUnmappedValue}
              onChange={(e, { checked }) => Datagrid.setQuery({ unmappedOnly: checked })}
              data-test='settings_dwolla_unmapped_only_chckb'
            />
          </GridColumn>
        )}
        {bankAccTab && bankAccounts.registerButton && (
          <GridColumn computer={5} tablet={4}>
            <CustomButton
              fluid
              onClick={() => Router.push('/dwolla-register')}
              data-test='settings_dwolla_open_popup_btn'>
              <CustomIcon size='20' />
              <FormattedMessage
                id='settings.tables.bankAccounts.registerDwolla'
                defaultMessage='Register Dwolla Account'>
                {text => text}
              </FormattedMessage>
            </CustomButton>
          </GridColumn>
        )}
        {bankAccTab && bankAccounts.uploadDocumentsButton && (
          <GridColumn computer={4} tablet={4}>
            <CustomButton
              fluid
              onClick={() => openUploadDocumentsPopup()}
              data-test='settings_dwolla_upload_documents_btn'>
              <CustomUploadCloud size='20' />
              <FormattedMessage id='settings.tables.bankAccounts.uploadDoc' defaultMessage='Upload Documents'>
                {text => text}
              </FormattedMessage>
            </CustomButton>
          </GridColumn>
        )}
        {bankAccTab && bankAccounts.dwollaBalance && (
          <GridColumn computer={2}>
            <FormattedMessage id='settings.dwollaAccBalance' defaultMessage='Dwolla Balance: ' />
            <FormattedNumber style='currency' currency={dwollaAccBalance.currency} value={dwollaAccBalance.value} />
          </GridColumn>
        )}
        {!currentTab.hideButtons && (
          <>
            {(!bankAccTab || bankAccounts.addButton) && (
              <GridColumn widescreen={3} computer={3} tablet={4}>
                <Button
                  fluid
                  primary
                  onClick={() =>
                    currentTab.type === 'warehouses' || currentTab.type === 'branches' ? openSidebar() : openPopup()
                  }
                  data-test='settings_open_popup_btn'>
                  <FormattedMessage id={textsTable[currentTab.type].BtnAddText}>{text => text}</FormattedMessage>
                </Button>
              </GridColumn>
            )}
            {currentTab.type === 'products' && (
              <GridColumn widescreen={3} computer={3} tablet={4}>
                <Button fluid primary onClick={() => openImportPopup()} data-test='settings_open_import_popup_btn'>
                  <FormattedMessage id={textsTable[currentTab.type].BtnImportText}>{text => text}</FormattedMessage>
                </Button>
              </GridColumn>
            )}
          </>
        )}
        {/*{currentTab.type === 'global-broadcast' && (
          <GridColumn floated='right' widescreen={2} computer={2} tablet={3}>
            <Button
              fluid
              primary
              onClick={() => this.saveRulesBroadcast(treeData.model, toastManager)}
              data-test='settings_open_import_popup_btn'>
              <FormattedMessage id='global.save' defaultMessage='Save'>
                {text => text}
              </FormattedMessage>
            </Button>
          </GridColumn>
        )}*/}
      </>
    )
  }

  render() {
    return (
      <PositionHeaderSettings>
        <Grid as={Menu} secondary verticalAlign='middle' className='page-part'>
          <GridRow>{!this.props.currentTab.hideHandler && this.renderHandler()}</GridRow>
        </Grid>
      </PositionHeaderSettings>
    )
  }
}

const mapStateToProps = state => {
  const company = get(state, 'auth.identity.company', null)
  const dwollaAccountStatus = (company && company.dwollaAccountStatus) || 'none'
  const {
    broadcast: { data, filter, ...rest }
  } = state
  const treeData = data
    ? new TreeModel({ childrenPropertyName: 'elements' }).parse(data)
    : new TreeModel().parse({ model: { rule: {} } })
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
      : { value: '', currency },
    treeData,
    filter,
    ...rest
  }
}

export default withDatagrid(
  withToastManager(
    connect(mapStateToProps, { ...Actions, openGlobalBroadcast, saveRules, initGlobalBroadcast })(
      injectIntl(TablesHandlers)
    )
  )
)
