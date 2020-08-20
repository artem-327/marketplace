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
import { generateToastMarkup, getSafe } from '~/utils/functions'
import { PlusCircle, UploadCloud, CornerLeftDown } from 'react-feather'

const PositionHeaderSettings = styled.div`
  position: relative;
  z-index: 602;
`

const CustomRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: -5px -5px;
  flex-wrap: wrap;

  > div {
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .column {
    margin: 5px 5px;
  }

  input,
  .ui.dropdown {
    height: 40px;
  }

  .ui.button {
    height: 40px;
    border-radius: 3px;
    font-weight: 500;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
    border: solid 1px #dee2e6;
    background-color: #ffffff;
    color: #848893;
    display: flex;
    align-items: center;
    &:hover {
      background-color: #f8f9fb;
      color: #20273a;
    }
    &:active {
      background-color: #edeef2;
      color: #20273a;
    }

    svg {
      width: 18px;
      height: 20px;
      margin-right: 10px;
      vertical-align: top;
      color: inherit;
    }

    &.light {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
      border: solid 1px #dee2e6;
      background-color: #ffffff;
      color: #848893;
      &:hover {
        background-color: #f8f9fb;
        color: #20273a;
      }
      &:active {
        background-color: #edeef2;
        color: #20273a;
      }
    }

    &.primary {
      box-shadow: none;
      border: none;
      color: #ffffff;
      background-color: #2599d5;
      &:hover {
        background-color: #188ec9;
      }
      &:active {
        background-color: #0d82bc;
      }
    }
  }
`

const CustomLabel = styled.div`
  height: 32px;
  border-radius: 16px;
  background-color: #e5efd8;
  font-size: 14px;
  text-align: center;
  color: #84c225;
  padding: 0 17px;
  display: flex;
  align-items: center;
`

const VertSplit = styled.div`
  width: 1px;
  height: 40px;
  background-color: #dee2e6;
  margin: 0 10px;
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
  'guest-companies': {
    BtnAddText: 'settings.tables.guestCompanies.buttonAdd',
    SearchText: 'settings.tables.guestCompanies.search'
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
      filterValue: '',
      users: {
        searchInput: ''
      },
      products: {
        searchInput: '',
        productType: 'ALL'
      },
      /*
      'bank-accounts': {
        searchInput: ''
      },*/
      'guest-companies': {
        searchInput: ''
      },
      /*
      'logistics': {
        searchInput: ''
      },
      */
      documents: {
        searchInput: '',
        documentType: ''
      },
      documentType: '',
      options: []
    }
    this.handleFiltersValue = debounce(this.handleFiltersValue, 300)
  }

  async componentDidMount() {
    const {
      documentTypes,
      getDocumentTypes,
      initGlobalBroadcast,
      getDwollaBeneficiaryOwners,
      tableHandlersFilters,
      currentTab
    } = this.props
    try {
      //check dwolla if exist some document which has to be verified
      if (currentTab.type === 'bank-accounts') {
        await getDwollaBeneficiaryOwners()
      }
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
    if (tableHandlersFilters) {
      this.setState(tableHandlersFilters)
      const filter = tableHandlersFilters[currentTab.type]
      if (filter) {
        this.props.datagrid.clear()
        this.handleFiltersValue(filter)
      }
    } else {
      const filter = this.state[currentTab.type]
      if (filter) {
        this.props.datagrid.clear()
        this.handleFiltersValue(filter)
      }
    }
  }

  componentWillUnmount() {
    this.props.handleVariableSave('tableHandlersFiltersSettings', this.state)
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.currentTab !== this.props.currentTab) {
      const { currentTab } = this.props
      //check dwolla if exist some document which has to be verified
      if (currentTab.type === 'bank-accounts') {
        try {
          await this.props.getDwollaBeneficiaryOwners()
        } catch (error) {
          console.error(error)
        }
      }
      const filter = this.state[currentTab.type]
      if (filter) {
        this.props.datagrid.clear()
        this.handleFiltersValue(filter)
      }
    }
  }

  handleFiltersValue = filter => {
    const { datagrid } = this.props
    datagrid.setSearch(filter, true, 'pageFilters')
  }

  handleFilterChangeInputSearch = (e, data) => {
    const { currentTab } = this.props
    if (currentTab === '') return

    const filter = {
      ...this.state[currentTab.type],
      [data.name]: data.value
    }
    this.setState({ [currentTab.type]: filter })
    this.handleFiltersValue(filter)
  }

  handleFilterChangeMappedUnmapped = (e, data) => {
    const { currentTab } = this.props
    if (currentTab === '') return

    this.props.handleProductCatalogUnmappedValue(data.value)

    const filter = {
      ...this.state[currentTab.type],
      [data.name]: data.value
    }
    this.setState({ [currentTab.type]: filter })
    this.handleFiltersValue(filter)
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
      openDwollaPopup,
      dwollaAccBalance,
      // openGlobalBroadcast,
      bankAccounts,
      treeData,
      toastManager,
      openSidebar,
      intl: { formatMessage }
    } = this.props

    const filterValue = this.state[currentTab.type]
    const bankAccTab = currentTab.type === 'bank-accounts'
    return (
      <>
        {currentTab.type !== 'global-broadcast' &&
          currentTab.type !== 'documents' &&
          currentTab.type !== 'logistics' &&
          currentTab.type !== 'bank-accounts' && (
            <div>
              <div className='column'>
                <Input
                  style={{ width: '370px' }}
                  icon='search'
                  name='searchInput'
                  value={filterValue ? filterValue.searchInput : ''}
                  placeholder={formatMessage({
                    id: textsTable[currentTab.type].SearchText,
                    defaultMessage: 'Select Credit Card'
                  })}
                  onChange={this.handleFilterChangeInputSearch}
                />
              </div>
            </div>
          )}

        {(currentTab.type === 'logistics' || currentTab.type === 'bank-accounts') && (
          <div>
            <div className='column'>
              <Input
                style={{ width: '370px' }}
                icon='search'
                name={`${currentTab.type}Filter`}
                value={this.props[`${currentTab.type}Filter`]}
                placeholder={formatMessage({
                  id: textsTable[currentTab.type].SearchText,
                  defaultMessage: 'Select Credit Card'
                })}
                onChange={(e, data) => this.props.handleVariableSave(data.name, data.value)}
              />
            </div>
          </div>
        )}

        {currentTab.type === 'documents' && (
          <div>
            <div className='column'>
              <Input
                style={{ width: '370px' }}
                icon='search'
                name='searchInput'
                value={filterValue.searchInput}
                placeholder={formatMessage({
                  id: textsTable[currentTab.type].SearchText,
                  defaultMessage: 'Select Credit Card'
                })}
                onChange={this.handleFilterChangeInputSearch}
              />
            </div>
            <div className='column'>
              <Dropdown
                style={{ width: '200px' }}
                name='documentType'
                value={filterValue.documentType}
                placeholder={formatMessage({
                  id: 'settings.tables.documents.dropdown',
                  defaultMessage: 'Choose document type'
                })}
                selection
                options={this.state.options}
                onChange={this.handleFilterChangeInputSearch}
              />
            </div>
          </div>
        )}

        <div>
          {currentTab.type === 'products' && (
            <div className='column'>
              <Dropdown
                style={{ width: '200px' }}
                placeholder={formatMessage({
                  id: 'operations.tables.companyProductCatalog.MappedText',
                  defaultMessage: 'Select mapped/unmapped only'
                })}
                selection
                options={[
                  {
                    key: 0,
                    text: formatMessage({ id: 'operations.noSelection', defaultMessage: 'All' }),
                    value: 'ALL'
                  },
                  {
                    key: 1,
                    text: formatMessage({ id: 'operations.unmapped', defaultMessage: 'Unmapped Only' }),
                    value: 'UNMAPPED'
                  },
                  {
                    key: 2,
                    text: formatMessage({ id: 'operations.mappedOnly', defaultMessage: 'Mapped Only' }),
                    value: 'MAPPED'
                  }
                ]}
                name='productType'
                value={filterValue.productType}
                onChange={this.handleFilterChangeMappedUnmapped}
                data-test='settings_dwolla_unmapped_only_drpdn'
              />
            </div>
          )}
          {bankAccTab && bankAccounts.registerButton && (
            <div className='column'>
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
            </div>
          )}
          {bankAccTab && bankAccounts.uploadDocumentsButton && (
            <div className='column'>
              <CustomButton
                fluid
                onClick={() => openUploadDocumentsPopup()}
                data-test='settings_dwolla_upload_documents_btn'>
                <CustomUploadCloud size='20' />
                <FormattedMessage id='settings.tables.bankAccounts.uploadDoc' defaultMessage='Upload Documents'>
                  {text => text}
                </FormattedMessage>
              </CustomButton>
            </div>
          )}
          {bankAccTab && bankAccounts.uploadOwnerDocumentsButton && (
            <div className='column'>
              <CustomButton
                fluid
                onClick={() => openUploadDocumentsPopup()}
                data-test='settings_dwolla_owner_upload_documents_btn'>
                <CustomUploadCloud size='20' />
                <FormattedMessage
                  id='settings.tables.bankAccounts.uploadOwnerDoc'
                  defaultMessage='Upload Owner Documents'>
                  {text => text}
                </FormattedMessage>
              </CustomButton>
            </div>
          )}
          {bankAccTab && bankAccounts.dwollaBalance && (
            <>
              <div className='column'>
                <CustomLabel>
                  <div>
                    <FormattedMessage id='settings.dwollaAccBalance' defaultMessage='Dwolla Balance: ' />
                    <b>
                      <FormattedNumber
                        minimumFractionDigits={2}
                        maximumFractionDigits={2}
                        style='currency'
                        currency={dwollaAccBalance.currency}
                        value={dwollaAccBalance.value}
                      />
                    </b>
                  </div>
                </CustomLabel>
              </div>
              <div className='column'>
                <VertSplit />
              </div>
            </>
          )}
          {!currentTab.hideButtons && (
            <>
              {currentTab.type === 'products' && (
                <div className='column'>
                  <Button fluid onClick={() => openImportPopup()} data-test='settings_open_import_popup_btn'>
                    <CornerLeftDown />
                    <FormattedMessage id={textsTable[currentTab.type].BtnImportText}>{text => text}</FormattedMessage>
                  </Button>
                </div>
              )}
              {(!bankAccTab || bankAccounts.addButton) && (
                <div className='column'>
                  <Button primary onClick={() => openPopup()} data-test='settings_open_popup_btn'>
                    <PlusCircle />
                    <FormattedMessage id={textsTable[currentTab.type].BtnAddText}>{text => text}</FormattedMessage>
                  </Button>
                </div>
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
        </div>
      </>
    )
  }

  render() {
    return (
      <PositionHeaderSettings>
        <CustomRowDiv>{!this.props.currentTab.hideHandler && this.renderHandler()}</CustomRowDiv>

        {false && (
          <Grid as={Menu} secondary verticalAlign='middle' className='page-part'>
            <GridRow>{!this.props.currentTab.hideHandler && this.renderHandler()}</GridRow>
          </Grid>
        )}
      </PositionHeaderSettings>
    )
  }
}

const mapStateToProps = state => {
  const company = get(state, 'auth.identity.company', null)
  let dwollaAccountStatus = 'none'
  if (company.dwollaAccountStatus) dwollaAccountStatus = company.dwollaAccountStatus
  if (
    dwollaAccountStatus === 'verified' &&
    getSafe(() => state.settings.documentsOwner.length, '') &&
    getSafe(() => state.settings.documentsOwner[0].verificationStatus, '') !== 'verified'
  )
    dwollaAccountStatus = 'documentOwner'
  const {
    broadcast: { data, filter, ...rest }
  } = state
  const treeData = data
    ? new TreeModel({ childrenPropertyName: 'elements' }).parse(data)
    : new TreeModel().parse({ model: { rule: {} } })
  //const dwollaAccountStatus = 'document'

  return {
    logisticsFilter: state.settings.logisticsFilter,
    'bank-accountsFilter': state.settings['bank-accountsFilter'],
    documentTypes: state.settings.documentTypes,
    bankAccounts: bankAccountsConfig[dwollaAccountStatus],
    currentTab: state.settings.currentTab,
    tableHandlersFilters: state.settings.tableHandlersFiltersSettings,
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
