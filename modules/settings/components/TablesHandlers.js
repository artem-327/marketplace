import { Component } from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'
import { Header, Menu, Button, Checkbox, Input, Dropdown, Grid, GridRow, GridColumn, Popup } from 'semantic-ui-react'
import { debounce } from 'lodash'
import Router from 'next/router'
import styled from 'styled-components'
import TreeModel from 'tree-model'
import { withToastManager } from 'react-toast-notifications'

import * as Actions from '../actions'
import { saveRules, initGlobalBroadcast } from '~/modules/broadcast/actions'
import { withDatagrid, Datagrid } from '~/modules/datagrid'
import { FormattedNumber, FormattedMessage, injectIntl } from 'react-intl'
import { bankAccountsConfig, vellociAccountsConfig } from './BankAccountsTable/BankAccountsTable'
import { currency } from '~/constants/index'
import { generateToastMarkup, getSafe } from '~/utils/functions'
import { PlusCircle, UploadCloud, CornerLeftDown, Link2 } from 'react-feather'
import ColumnSettingButton from '~/components/table/ColumnSettingButton'
import { PlaidLink } from 'react-plaid-link'
import api from '~/api'
//Components
import BasicButton from '../../../components/buttons/BasicButton'
//Constants
import { VELLOCI_ACCOUNT_STATUSES } from '../contants'

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
      &[disabled] {
        opacity: 0.3 !important;
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

const PlaidButton = styled(PlaidLink)`
  cursor: ${props => (props.disabled ? 'not-allowed !important' : 'pointer !important')};
  pointer-events: ${props => (props.disabled ? 'none !important' : 'auto !important')};
  margin-right: 4px;
  width: 125px !important;
  box-shadow: none !important;
  border: solid 1px #dee2e6 !important;
  color: #20273a !important;
  opacity: ${props => (props.disabled ? '0.3 !important' : '1 !important')};
  height: 40px !important;
  border-radius: 3px !important;
  font-weight: 500 !important;
  align-items: center !important;
  display: flex !important;
  justify-content: center !important;
  font-size: 14px !important;
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
  'credit-cards': {
    BtnAddText: 'settings.tables.creditCards.buttonAdd',
    SearchText: 'settings.tables.creditCards.search'
  },
  'bank-accounts': {
    BtnAddText: 'settings.tables.bankAccounts.buttonAdd',
    SearchText: 'settings.tables.bankAccounts.search',
    SendLink: 'settings.tables.bankAccounts.sendLink'
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
  },
  'system-settings': {
    hideHandler: true
  },
  'company-details': {
    hideHandler: true
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

  componentDidMount = async () => {
    const {
      documentTypes,
      getDocumentTypes,
      initGlobalBroadcast,
      getDwollaBeneficiaryOwners,
      tableHandlersFilters,
      currentTab,
      paymentProcessor,
      accountStatus,
      vellociGetToken
    } = this.props

    try {
      //check dwolla if exist some document which has to be verified
      if (currentTab === 'bank-accounts' && paymentProcessor === 'DWOLLA' && accountStatus) {
        await getDwollaBeneficiaryOwners()
      }
      if (paymentProcessor === 'VELLOCI') {
        await vellociGetToken()
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
          value: ''
        },
        ...this.props.documentTypes.map(doc => ({
          key: doc.key,
          text: doc.text,
          value: doc.text
        }))
      ]
    })
    if (tableHandlersFilters) {
      this.setState(tableHandlersFilters)
      const filter = tableHandlersFilters[currentTab]
      if (filter) {
        this.props.datagrid.clear()
        this.handleFiltersValue(filter)
      }
    } else {
      const filter = this.state[currentTab]
      if (filter) {
        this.props.datagrid.clear()
        this.handleFiltersValue(filter)
      }
    }
  }

  componentWillUnmount() {
    this.props.handleVariableSave('tableHandlersFiltersSettings', this.state)
  }

  handleFiltersValue = filter => {
    const { datagrid } = this.props
    datagrid.setSearch(filter, true, 'pageFilters')
  }

  handleFilterChangeInputSearch = (e, data) => {
    const { currentTab } = this.props
    if (currentTab === '') return

    const filter = {
      ...this.state[currentTab],
      [data.name]: data.value
    }
    this.setState({ [currentTab]: filter })
    this.handleFiltersValue(filter)
  }

  handleFilterChangeMappedUnmapped = (e, data) => {
    const { currentTab } = this.props
    if (currentTab === '') return

    this.props.handleProductCatalogUnmappedValue(data.value)

    const filter = {
      ...this.state[currentTab],
      [data.name]: data.value
    }
    this.setState({ [currentTab]: filter })
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
  onExit = async (err, metadata) => {
    this.props.reloadBankAccounts(true)
  }

  onSuccess = async (publicToken, metadata) => {
    await this.props.vellociAddAcount(publicToken, metadata)
  }

  onEvent = async (eventName, metadata) => {
    this.props.vellociOnEvent(eventName, metadata)
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
      bankAccounts,
      treeData,
      toastManager,
      openSidebar,
      vellociAccBalance,
      paymentProcessor,
      vellociBusinessId,
      vellociToken,
      intl: { formatMessage },
      isThirdPartyConnectionException,
      accountStatus
    } = this.props

    const filterValue = this.state[currentTab]
    const bankAccTab = currentTab === 'bank-accounts'

    return (
      <>
        {currentTab !== 'documents' && currentTab !== 'logistics' && currentTab !== 'bank-accounts' && (
          <div>
            <div className='column'>
              <Input
                style={{ width: '370px' }}
                icon='search'
                name='searchInput'
                value={filterValue ? filterValue.searchInput : ''}
                placeholder={formatMessage({
                  id: textsTable[currentTab].SearchText,
                  defaultMessage: 'Select Credit Card'
                })}
                onChange={this.handleFilterChangeInputSearch}
              />
            </div>
          </div>
        )}

        {currentTab === 'logistics' && (
          <div>
            <div className='column'>
              <Input
                style={{ width: '370px' }}
                icon='search'
                name={`${currentTab}Filter`}
                value={this.props[`${currentTab}Filter`]}
                placeholder={formatMessage({
                  id: textsTable[currentTab].SearchText,
                  defaultMessage: 'Select Credit Card'
                })}
                onChange={(e, data) => this.props.handleVariableSave(data.name, data.value)}
              />
            </div>
          </div>
        )}

        {currentTab === 'bank-accounts' && (
          <div>
            <div className='column'></div>
          </div>
        )}

        {currentTab === 'documents' && (
          <div>
            <div className='column'>
              <Input
                style={{ width: '370px' }}
                icon='search'
                name='searchInput'
                value={filterValue.searchInput}
                placeholder={formatMessage({
                  id: textsTable[currentTab].SearchText,
                  defaultMessage: 'Select Credit Card'
                })}
                onChange={this.handleFilterChangeInputSearch}
              />
            </div>
            <div className='column'>
              <Dropdown
                style={{ width: '200px' }}
                name='documentType'
                value={filterValue?.documentType}
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
          {currentTab === 'products' && (
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
                onClick={() => {
                  paymentProcessor === 'DWOLLA' ? Router.push('/dwolla-register') : Router.push('/onboarding')
                }}
                data-test={
                  paymentProcessor === 'DWOLLA'
                    ? 'settings_dwolla_open_popup_btn'
                    : 'settings_open_register_velloci_btn'
                }>
                <CustomIcon size='20' />
                <FormattedMessage
                  id={
                    paymentProcessor === 'DWOLLA'
                      ? 'settings.tables.bankAccounts.registerDwolla'
                      : 'settings.tables.bankAccounts.registerVelloci'
                  }
                  defaultMessage={
                    paymentProcessor === 'DWOLLA' ? 'Register Dwolla Account' : 'Register Velloci Account'
                  }>
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
          {bankAccTab && bankAccounts.balance && (
            <>
              <div className='column'>
                <CustomLabel>
                  <div>
                    <FormattedMessage
                      id={paymentProcessor === 'DWOLLA' ? 'settings.dwollaAccBalance' : 'settings.vellociAccBalance'}
                      defaultMessage={paymentProcessor === 'DWOLLA' ? 'Dwolla Ballance: ' : 'Velloci Balance: '}
                    />
                    <b>
                      <FormattedNumber
                        minimumFractionDigits={2}
                        maximumFractionDigits={2}
                        style='currency'
                        currency={
                          paymentProcessor === 'DWOLLA' ? dwollaAccBalance.currency : vellociAccBalance.currency
                        }
                        value={paymentProcessor === 'DWOLLA' ? dwollaAccBalance.value : vellociAccBalance.value}
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
          {!(textsTable[currentTab] && textsTable[currentTab].hideButtons) && (
            <>
              {currentTab === 'products' && (
                <div className='column'>
                  <Button fluid onClick={() => openImportPopup()} data-test='settings_open_import_popup_btn'>
                    <CornerLeftDown />
                    <FormattedMessage id={textsTable[currentTab].BtnImportText}>{text => text}</FormattedMessage>
                  </Button>
                </div>
              )}

              <div className='column'>
                {bankAccTab && bankAccounts.addButton && paymentProcessor === 'VELLOCI' && (
                  <Popup
                    size='small'
                    disabled={vellociToken && vellociBusinessId && !isThirdPartyConnectionException}
                    header={
                      <FormattedMessage
                        id='settings.velloci.difficulties'
                        defaultMessage='Velloci is experiencing some difficulties, please try again later.'
                      />
                    }
                    trigger={
                      <div>
                        <PlaidButton
                          disabled={!vellociToken || !vellociBusinessId || isThirdPartyConnectionException}
                          token={vellociToken}
                          publicKey={vellociBusinessId}
                          onExit={this.onExit}
                          onSuccess={this.onSuccess}
                          onEvent={this.onEvent}>
                          <div style={{ marginLeft: '10px' }}>
                            <FormattedMessage id={textsTable[currentTab].BtnAddText}>{text => text}</FormattedMessage>
                          </div>
                        </PlaidButton>
                      </div>
                    }
                  />
                )}
                {(bankAccTab && bankAccounts.addButton && paymentProcessor !== 'VELLOCI') || !bankAccTab ? (
                  <Popup
                    size='small'
                    disabled={!(currentTab === 'logistics' && isThirdPartyConnectionException)}
                    header={
                      <FormattedMessage
                        id='settings.logistics.difficulties'
                        defaultMessage='Logistics cannot be retrieved at the moment. Please try again later.'
                      />
                    }
                    trigger={
                      <div>
                        <Button
                          primary
                          onClick={() => openSidebar(null, currentTab)}
                          data-test='settings_open_popup_btn'
                          disabled={currentTab === 'logistics' && isThirdPartyConnectionException}>
                          <PlusCircle />
                          <FormattedMessage id={textsTable[currentTab].BtnAddText}>{text => text}</FormattedMessage>
                        </Button>
                      </div>
                    }
                  />
                ) : null}
              </div>
              {bankAccTab &&
              (accountStatus === VELLOCI_ACCOUNT_STATUSES.ACTIVE ||
                accountStatus === VELLOCI_ACCOUNT_STATUSES.PENDING_KYB ||
                accountStatus === VELLOCI_ACCOUNT_STATUSES.MEMBER_PENDING) ? (
                <Popup
                  size='small'
                  disabled={vellociToken && vellociBusinessId && !isThirdPartyConnectionException}
                  header={
                    <FormattedMessage
                      id='settings.velloci.difficulties'
                      defaultMessage='Velloci is experiencing some difficulties, please try again later.'
                    />
                  }
                  trigger={
                    <div className='column'>
                      <BasicButton
                        type='button'
                        onClick={() => openPopup()}
                        data-test='settings_open_popup_send_link_btn'
                        disabled={isThirdPartyConnectionException}>
                        <>
                          <Link2 />
                          <FormattedMessage id={textsTable[currentTab].SendLink}>{text => text}</FormattedMessage>
                        </>
                      </BasicButton>
                    </div>
                  }
                />
              ) : null}
            </>
          )}
          {!bankAccTab && <ColumnSettingButton divide={true} />}
        </div>
      </>
    )
  }

  render() {
    const { currentTab } = this.props
    return (
      <PositionHeaderSettings>
        <CustomRowDiv>
          {!(textsTable[currentTab] && textsTable[currentTab].hideHandler) && this.renderHandler()}
        </CustomRowDiv>
      </PositionHeaderSettings>
    )
  }
}

const mapStateToProps = state => {
  const company = get(state, 'auth.identity.company', null)
  let accountStatus = 'none'
  if (company.dwollaAccountStatus && company.paymentProcessor === 'DWOLLA') {
    accountStatus = company.dwollaAccountStatus
    if (
      accountStatus === 'verified' &&
      getSafe(() => state.settings.documentsOwner.length, '') &&
      getSafe(() => state.settings.documentsOwner[0].verificationStatus, '') !== 'verified'
    ) {
      accountStatus = 'documentOwner'
    }
  } else if (company.vellociAccountStatus && company.paymentProcessor === 'VELLOCI') {
    accountStatus = company.vellociAccountStatus
  }
  const {
    broadcast: { data, filter, ...rest }
  } = state
  const treeData = data
    ? new TreeModel({ childrenPropertyName: 'elements' }).parse(data)
    : new TreeModel().parse({ model: { rule: {} } })
  //const accountStatus = 'document'

  return {
    accountStatus,
    paymentProcessor: getSafe(() => company.paymentProcessor, 'DWOLLA'),
    logisticsFilter: state.settings.logisticsFilter,
    'bank-accountsFilter': state.settings['bank-accountsFilter'],
    documentTypes: state.settings.documentTypes,
    bankAccounts: bankAccountsConfig[accountStatus],
    tableHandlersFilters: state.settings.tableHandlersFiltersSettings,
    deliveryAddressesFilter: state.settings.deliveryAddressesFilter,
    productsFilter: state.settings.productsFilter,
    filterValue: state.settings.filterValue,
    vellociAccBalance: state.settings.vellociAccBalance
      ? state.settings.vellociAccBalance.balance
      : { value: '', currency },
    dwollaAccBalance: state.settings.dwollaAccBalance
      ? state.settings.dwollaAccBalance.balance
      : { value: '', currency },
    treeData,
    filter,
    ...rest,
    vellociBusinessId: getSafe(() => company.vellociBusinessId, ''),
    vellociToken: getSafe(() => state.settings.vellociToken, ''),
    isThirdPartyConnectionException: getSafe(() => state.settings.isThirdPartyConnectionException, false)
  }
}

export default withDatagrid(
  withToastManager(connect(mapStateToProps, { ...Actions, saveRules, initGlobalBroadcast })(injectIntl(TablesHandlers)))
)
