import { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import ProdexTable from '~/components/table'
import { Header, Modal, Form, Segment, Label, Table } from 'semantic-ui-react'
import { createConfirmation, confirmable } from 'react-confirm'
import confirm from '~/components/Confirmable/confirm'
import { Formik } from 'formik'
import { Input, Button } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import get from 'lodash/get'
import styled from 'styled-components'
import { getSafe } from '~/utils/functions'
import { getIdentity } from '~/modules/auth/actions'
import { Check } from 'react-feather'

import {
  openPopup,
  closePopup,
  getBankAccountsDataRequest,
  getDwollaAccBalance,
  handleOpenConfirmPopup,
  closeConfirmPopup,
  deleteConfirmation,
  deleteBankAccount,
  dwollaInitiateVerification,
  dwollaFinalizeVerification,
  getCurrentUser,
  dwollaSetPreferred,
  getVellociAccBalance,
  reloadBankAccounts,
  deleteInstitution,
  hideInactiveAccounts,
  openPopupDeleteInstitutions,
  getCompanyDetails
} from '../../actions'

import { FormattedMessage, injectIntl } from 'react-intl'
import { errorMessages } from '~/constants/yupValidation'
import ActionCell from '~/components/table/ActionCell'
import ConfirmDeleteInstitution from './ConfirmDeleteInstitution'
//Styles
import { DivCircle, StatusLabel } from './styles'

const Container = styled.div`
  overflow-y: auto;
  padding: 0 1em 2em 1em;
  max-height: 70vh;
`

const CustomDiv = styled.div`
  border-radius: 4px;
  border: solid 1px #2599d5;
  background-color: #ffffff;
  padding: 30px;
`

const DivThirdExceptions = styled.div`
  border-radius: 4px;
  text-align: center;
  border: solid 1px #2599d5;
  background-color: #ffffff;
  padding: 30px;
  height: 80px !important;
  flex-grow: 0 !important;
`

const SpanText = styled.span`
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
  font-weight: 500;
`

const FinalizeConfirmDialog = confirmable(({ proceed, show, dismiss }) => (
  <Formik
    initialValues={{
      amount1: '',
      amount2: ''
    }}
    validationSchema={Yup.object().shape({
      amount1: Yup.number(errorMessages.mustBeNumber)
        .typeError(errorMessages.mustBeNumber)
        .required(errorMessages.requiredMessage),
      amount2: Yup.number(errorMessages.mustBeNumber)
        .typeError(errorMessages.mustBeNumber)
        .required(errorMessages.requiredMessage)
    })}
    onSubmit={values => proceed(values)}
    onReset={dismiss}
    validateOnBlur={false}
    validateOnChange={false}>
    {({ handleReset, handleSubmit, isSubmitting }) => (
      <Modal closeIcon onClose={() => dismiss()} size='tiny' centered={false} open={show} onClose={dismiss}>
        <Modal.Header>
          <FormattedMessage id='settings.finalizeVerification' defaultMessage='Finalize Verification' />
        </Modal.Header>
        <Modal.Content>
          <Segment basic loading={isSubmitting}>
            <Form>
              <Header as='h3'>
                <FormattedMessage
                  id='settings.provideAmounts'
                  defaultMessage='Please provide amounts that were transferred to your account'
                />
                :
              </Header>
              <Form.Group widths='equal' data-test='settings_bank_account_amounts_inp'>
                <Input
                  label={<FormattedMessage id='settings.amountNum' defaultMessage='Amount 1' values={{ num: 1 }} />}
                  name='amount1'
                  type='number'
                  min='0'
                />
                <Input
                  label={<FormattedMessage id='settings.amountNum' defaultMessage='Amount 2' values={{ num: 2 }} />}
                  name='amount2'
                  type='number'
                  min='0'
                />
              </Form.Group>
            </Form>
          </Segment>
        </Modal.Content>
        <Modal.Actions>
          <Button primary inverted onClick={handleReset} data-test='settings_bank_account_cancel_btn'>
            <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
              {text => text}
            </FormattedMessage>
          </Button>
          <Button primary onClick={handleSubmit} data-test='settings_bank_account_confirm_btn'>
            <FormattedMessage id='global.confirm' defaultMessage='Confirm'>
              {text => text}
            </FormattedMessage>
          </Button>
        </Modal.Actions>
      </Modal>
    )}
  </Formik>
))

const finalizeConfirm = createConfirmation(FinalizeConfirmDialog)
//TODO registerVelloci
export const bankAccountsConfig = {
  none: {
    registerButton: true,
    addButton: false,
    balance: false,
    searchField: false,
    accountStatus: true,
    bankAccountList: false,
    uploadDocumentsButton: false,
    documentStatus: false
  },
  deactivated: {
    registerButton: true,
    addButton: false,
    balance: false,
    searchField: false,
    accountStatus: true,
    bankAccountList: false,
    uploadDocumentsButton: false,
    documentStatus: false
  },
  retry: {
    registerButton: true,
    addButton: false,
    balance: false,
    searchField: false,
    accountStatus: true,
    bankAccountList: false,
    uploadDocumentsButton: false,
    documentStatus: false
  },
  document: {
    registerButton: false,
    addButton: false,
    balance: false,
    searchField: false,
    accountStatus: true,
    bankAccountList: false,
    uploadDocumentsButton: true,
    documentStatus: true
  },
  documentOwner: {
    registerButton: false,
    addButton: false,
    balance: false,
    searchField: false,
    accountStatus: true,
    bankAccountList: false,
    uploadDocumentsButton: false,
    documentStatus: true,
    uploadOwnerDocumentsButton: true,
    documentOwner: true
  },
  verified: {
    registerButton: false,
    addButton: true,
    balance: true,
    searchField: true,
    accountStatus: false,
    bankAccountList: true,
    uploadDocumentsButton: false,
    documentStatus: false
  },
  suspended: {
    registerButton: false,
    addButton: false,
    balance: false,
    searchField: false,
    accountStatus: true,
    bankAccountList: false,
    uploadDocumentsButton: false,
    documentStatus: false
  },
  active: {
    registerButton: false,
    addButton: true,
    balance: false,
    searchField: true,
    accountStatus: false,
    bankAccountList: true,
    uploadDocumentsButton: false,
    documentStatus: false
  },
  pending_kyb: {
    registerButton: false,
    addButton: true,
    balance: false,
    searchField: false,
    accountStatus: true,
    bankAccountList: false,
    uploadDocumentsButton: false,
    documentStatus: false
  },
  member_pending: {
    registerButton: false,
    addButton: true,
    balance: false,
    searchField: false,
    accountStatus: true,
    bankAccountList: false,
    uploadDocumentsButton: false,
    documentStatus: false
  },
  member_review: {
    registerButton: false,
    addButton: false,
    balance: false,
    searchField: false,
    accountStatus: true,
    bankAccountList: false,
    uploadDocumentsButton: false,
    documentStatus: false
  },
  member_unverified: {
    registerButton: false,
    addButton: false,
    balance: false,
    searchField: false,
    accountStatus: true,
    bankAccountList: false,
    uploadDocumentsButton: false,
    documentStatus: false
  },
  member_failed: {
    registerButton: false,
    addButton: false,
    balance: false,
    searchField: false,
    accountStatus: true,
    bankAccountList: false,
    uploadDocumentsButton: false,
    documentStatus: false
  }
}

class BankAccountsTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      amount1: 0,
      amount2: 0
    }
  }

  componentDidMount() {
    this.props.getBankAccountsDataRequest(this.props.paymentProcessor)
    this.props.getCurrentUser()
    this.props.getIdentity().then(resp => {
      getSafe(() => resp.value.identity.company.dwollaAccountStatus, '') === 'verified' &&
        this.props.getDwollaAccBalance()
      getSafe(() => resp.value.identity.company.vellociAccountStatus, '') === 'verified' &&
        this.props.getVellociAccBalance()
    })
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.isReloadBankAcounts || prevProps.isLoadingAddedAccounts !== this.props.isLoadingAddedAccounts) {
      await this.props.reloadBankAccounts(false)
      await this.props.getBankAccountsDataRequest(this.props.paymentProcessor)
      await this.props.getIdentity().then(resp => {
        getSafe(() => resp.value.identity.company.dwollaAccountStatus, '') === 'verified' &&
          this.props.getDwollaAccBalance()
        getSafe(() => resp.value.identity.company.vellociAccountStatus, '') === 'verified' &&
          this.props.getVellociAccBalance()
      })
    }
  }

  getColumns = () => [
    { name: 'accountName', disabled: true },
    {
      name: 'name',
      title: ' ',
      allowReordering: false,
      width: 750,
      maxWidth: 2000
    },
    {
      name: 'bankAccountType',
      title: ' ',
      disabled: true
    },
    {
      name: 'bankName',
      title: ' ',
      disabled: true
    },
    {
      name: 'statusLabel',
      title: ' ',
      disabled: true
    }
  ]

  getActions = () => {
    const {
      deleteBankAccount,
      dwollaInitiateVerification,
      dwollaFinalizeVerification,
      intl,
      bankAccounts,
      accountStatus,
      documentRequired,
      dwollaSetPreferred,
      preferredBankAccountId,
      paymentProcessor,
      method
    } = this.props

    const { formatMessage } = intl
    return [
      // { text: 'Edit', callback: row => openPopup(row) },
      {
        text: formatMessage({
          id: 'global.delete',
          defaultMessage: 'Delete'
        }),
        callback: row =>
          confirm(
            formatMessage({
              id: 'confirm.deleteBankAccount',
              defaultMessage: 'Delete Bank Account'
            }),
            formatMessage(
              {
                id: 'confirm.deleteItem',
                defaultMessage: `Do you really want to delete ${row.displayName}?`
              },
              { item: row.displayName }
            )
          ).then(async () => {
            try {
              await deleteBankAccount(row.id, paymentProcessor)
              this.props.getBankAccountsDataRequest(this.props.paymentProcessor)
            } catch (e) {
              console.error(e)
            }
          })
      },
      {
        text: formatMessage({
          id: 'settings.initiateVerification',
          defaultMessage: 'Initiate Verification'
        }),
        callback: async row => {
          try {
            await dwollaInitiateVerification(row.id)
          } catch (e) {
            console.error(e)
          }
        },
        hidden: row => row.status !== 'unverified' || method !== 'dwolla'
      },
      {
        text: formatMessage({
          id: 'settings.finalizeVerification',
          defaultMessage: 'Finalize Verification'
        }),
        callback: row => {
          finalizeConfirm().then(async v => {
            try {
              await dwollaFinalizeVerification(row.id, v.amount1, v.amount2)
            } catch (e) {
              console.error(e)
            }
          })
        },
        hidden: row => row.status !== 'verification_in_process' || method !== 'dwolla'
      },
      {
        text: formatMessage({
          id: 'settings.setAsPreferredBankAccount',
          defaultMessage: 'Set as Preferred'
        }),
        callback: async row => {
          try {
            await dwollaSetPreferred(row.id)
          } catch (e) {
            console.error(e)
          }
        },
        hidden: row => !(row.status === 'verified' || row.status === 'active') || row.id === preferredBankAccountId
      }
    ]
  }

  getRows = rows => {
    const { preferredBankAccountId, isHideInactiveAccounts } = this.props
    const backgroundColorStatus = {
      verified: '#84c225',
      unverified: '#f16844',
      verification_in_process: '#ffb24f',
      inactive: '#f16844',
      active: '#84c225'
    }
    const colorAccountName = {
      verified: '#20273a',
      unverified: '#f16844',
      verification_in_process: '#ffb24f',
      inactive: '#f16844',
      active: '#20273a'
    }
    let newRows = []
    if (isHideInactiveAccounts) {
      rows.forEach(row => {
        if (row.status === 'active') newRows.push(row)
      })
    } else {
      newRows = rows
    }
    return newRows.map(row => {
      const accountRow = (
        <div style={{ display: 'flex' }}>
          <DivCircle backgroundColor={backgroundColorStatus[row.status]} />
          <span style={{ color: colorAccountName[row.status] || '#20273a', lineHeight: '22px' }}>
            {row.accountName.toUpperCase()}
          </span>
          {preferredBankAccountId === row.id || preferredBankAccountId === row.account_public_id ? (
            <StatusLabel horizontal>
              <Check color='#84c225' size='14' strokeWidth='4' />
              <span>
                <FormattedMessage id='settings.preferred' defaultMessage='Preferred' />
              </span>
            </StatusLabel>
          ) : null}
        </div>
      )
      row.name = accountRow
      return {
        ...row,
        name: <ActionCell row={row} getActions={this.getActions} content={row.name} />
      }
    })
  }

  render() {
    const {
      myRows,
      loading,
      filterValue,
      intl,
      bankAccounts,
      method,
      accountStatus,
      documentRequired,
      isOpenPopupDeleteInstitution,
      closePopup,
      deleteInstitution,
      institutId,
      reloadBankAccounts,
      isThirdPartyConnectionException
    } = this.props
    const { formatMessage } = intl
    return (
      <Fragment>
        <ConfirmDeleteInstitution
          isOpenPopup={isOpenPopupDeleteInstitution}
          closePopup={closePopup}
          deleteInstitution={deleteInstitution}
          institutId={institutId}
          reloadBankAccounts={reloadBankAccounts}
        />

        {isThirdPartyConnectionException && (
          <DivThirdExceptions>
            <FormattedMessage
              id='payments.bankAccountCannnotRetrieved'
              defaultMessage='Bank accounts cannot be retrieved at the moment. Please try again later.'>
              {text => text}
            </FormattedMessage>
          </DivThirdExceptions>
        )}
        {!isThirdPartyConnectionException && bankAccounts.bankAccountList && !bankAccounts.documentOwner ? (
          <div className='flex stretched settings_bankaccounts listings-wrapper'>
            <ProdexTable
              messages={
                isThirdPartyConnectionException
                  ? {
                      noData: formatMessage({
                        id: 'payments.bankAccountCannnotRetrieved',
                        defaultMessage: 'Bank accounts cannot be retrieved at the moment. Please try again later.'
                      })
                    }
                  : null
              }
              isBankTable
              tableName='settings_bankaccounts'
              rows={this.getRows(myRows)}
              loading={loading}
              columns={this.getColumns()}
              filterValue={filterValue}
              groupBy={['bankName']}
              getChildGroups={rows =>
                _(rows)
                  .groupBy('bankName')
                  .map(v => ({
                    key: `${v[0].bankName}_${v[0].institution_id}_${v[0].id}`,
                    childRows: v
                  }))
                  .value()
              }
              groupActions={row => {
                return [
                  this.props.isHideInactiveAccounts
                    ? {
                        text: formatMessage({
                          id: 'settings.accounts.viewInactiveAccounts',
                          defaultMessage: 'View Inactive Accounts'
                        }),
                        callback: async () => {
                          try {
                            await this.props.hideInactiveAccounts(false)
                          } catch (e) {
                            console.error(e)
                          }
                        }
                      }
                    : {
                        text: formatMessage({
                          id: 'settings.accounts.hideInactiveAccounts',
                          defaultMessage: 'Hide Inactive Accounts'
                        }),
                        callback: async () => {
                          try {
                            await this.props.hideInactiveAccounts(true)
                          } catch (e) {
                            console.error(e)
                          }
                        }
                      },
                  {
                    text: formatMessage({
                      id: 'settings.accounts.deleteInstitutions',
                      defaultMessage: 'Delete Institutions'
                    }),
                    callback: async row => {
                      let [bankName, institutionId, id] = row.key.split('_')
                      await this.props.openPopupDeleteInstitutions(institutionId)
                    }
                  }
                ]
              }}
              renderGroupLabel={({ row: { value }, groupLength }) => null}
            />
          </div>
        ) : null}

        {!isThirdPartyConnectionException && (bankAccounts.accountStatus || bankAccounts.documentStatus) && (
          <Container style={{ padding: '0 0 28px 0' }}>
            {bankAccounts.accountStatus && !bankAccounts.documentOwner && (
              <>
                <Table style={{ marginTop: 0, marginBottom: 30 }}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell width={4}>
                        <FormattedMessage
                          id={`${method}.registrationStatus`}
                          defaultMessage='Dwolla Registration Status'
                        />
                      </Table.HeaderCell>
                      <Table.HeaderCell width={10}>
                        <FormattedMessage id='dwolla.info' defaultMessage='Info' />
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                        <FormattedMessage id={`${method}.registrationStatus.${accountStatus}`} />
                      </Table.Cell>
                      <Table.Cell>
                        {bankAccounts.documentStatus ? (
                          <>
                            <FormattedMessage id={`${method}.info.${accountStatus}`} />
                            &nbsp;
                            <FormattedMessage id={`${method}.document.${documentRequired}`} />
                          </>
                        ) : (
                          <FormattedMessage id={`${method}.info.${accountStatus}`} />
                        )}
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </>
            )}

            {bankAccounts.accountStatus && bankAccounts.documentOwner && (
              <CustomDiv>
                <FormattedMessage id={`${method}.document.owner.header1`}>{text => <h3>{text}</h3>}</FormattedMessage>
                <FormattedMessage id={`${method}.document.owner.text1`}>{text => <div>{text}</div>}</FormattedMessage>
                <FormattedMessage id={`${method}.document.owner.text2`}>{text => <div>{text}</div>}</FormattedMessage>
                <FormattedMessage id={`${method}.document.owner.text3`}>{text => <div>{text}</div>}</FormattedMessage>
              </CustomDiv>
            )}

            {bankAccounts.documentStatus && !bankAccounts.documentOwner && (
              <CustomDiv>
                <FormattedMessage id={`${method}.document.explanatory.header1`}>
                  {text => <h3>{text}</h3>}
                </FormattedMessage>
                <FormattedMessage id={`${method}.document.explanatory.text1`}>
                  {text => <div>{text}</div>}
                </FormattedMessage>
                <FormattedMessage id={`${method}.document.explanatory.header2`}>
                  {text => <h3>{text}</h3>}
                </FormattedMessage>
                <FormattedMessage id={`${method}.document.explanatory.text21`}>
                  {text => <div>{text}</div>}
                </FormattedMessage>
                <br></br>
                <li>
                  <FormattedMessage id={`${method}.document.explanatory.BoldLi11`}>
                    {text => <b>{text}</b>}
                  </FormattedMessage>
                  <FormattedMessage id={`${method}.document.explanatory.TextLi11`}>
                    {text => <span>{text}</span>}
                  </FormattedMessage>
                </li>
                <li>
                  <FormattedMessage id={`${method}.document.explanatory.BoldLi12`}>
                    {text => <b>{text}</b>}
                  </FormattedMessage>
                  <FormattedMessage id={`${method}.document.explanatory.TextLi12`}>
                    {text => <span>{text}</span>}
                  </FormattedMessage>
                </li>
                <li>
                  <FormattedMessage id={`${method}.document.explanatory.BoldLi13`}>
                    {text => <b>{text}</b>}
                  </FormattedMessage>
                  <FormattedMessage id={`${method}.document.explanatory.TextLi13`}>
                    {text => <span>{text}</span>}
                  </FormattedMessage>
                </li>
                <br></br>
                <FormattedMessage id={`${method}.document.explanatory.text22`}>
                  {text => <div>{text}</div>}
                </FormattedMessage>
                <br></br>
                <FormattedMessage id={`${method}.document.explanatory.li21`}>
                  {text => <li>{text}</li>}
                </FormattedMessage>
                <FormattedMessage id={`${method}.document.explanatory.li22`}>
                  {text => <li>{text}</li>}
                </FormattedMessage>
                <FormattedMessage id={`${method}.document.explanatory.li23`}>
                  {text => <li>{text}</li>}
                </FormattedMessage>
                <FormattedMessage id={`${method}.document.explanatory.li24`}>
                  {text => <li>{text}</li>}
                </FormattedMessage>
              </CustomDiv>
            )}
          </Container>
        )}
      </Fragment>
    )
  }
}

const mapDispatchToProps = {
  openPopup,
  closePopup,
  getBankAccountsDataRequest,
  getDwollaAccBalance,
  handleOpenConfirmPopup,
  closeConfirmPopup,
  deleteBankAccount,
  dwollaInitiateVerification,
  dwollaFinalizeVerification,
  getCurrentUser,
  dwollaSetPreferred,
  getIdentity,
  getVellociAccBalance,
  reloadBankAccounts,
  deleteInstitution,
  hideInactiveAccounts,
  openPopupDeleteInstitutions,
  getCompanyDetails
}

const statusToLabel = {
  verified: (
    <StatusLabel style={{ backgroundColor: '#84c225' }} horizontal>
      <FormattedMessage id='settings.verified' defaultMessage='Verified' />
    </StatusLabel>
  ),
  unverified: (
    <StatusLabel style={{ backgroundColor: '#f16844' }} horizontal>
      <FormattedMessage id='settings.unverified' defaultMessage='Unverified' />
    </StatusLabel>
  ),
  verification_in_process: (
    <StatusLabel style={{ backgroundColor: '#ffb24f' }} horizontal>
      <FormattedMessage id='settings.verificationInProcess' defaultMessage='Verification in process' />
    </StatusLabel>
  ),
  active: (
    <StatusLabel style={{ backgroundColor: '#84c225' }} horizontal>
      <FormattedMessage id='settings.active' defaultMessage='Active' />
    </StatusLabel>
  )
}

const displayStatus = (r, preferredBankAccountId) => {
  return (
    <>
      {statusToLabel[r.status]}
      {preferredBankAccountId === r.id || preferredBankAccountId === r.account_public_id ? (
        <StatusLabel style={{ backgroundColor: '#2599d5' }} horizontal>
          <FormattedMessage id='settings.preferred' defaultMessage='Preferred' />
        </StatusLabel>
      ) : null}
    </>
  )
}

const mapStateToProps = state => {
  const company = get(state, 'auth.identity.company', null)
  const paymentProcessor = getSafe(() => company.paymentProcessor, 'DWOLLA')

  const preferredBankAccountId = get(state, 'settings.currentUser.company.preferredBankAccountId', '')
  let documentRequired = 'verify-with-document'
  let accountStatus = 'none'

  if (company && paymentProcessor === 'DWOLLA') {
    if (company.dwollaAccountStatus) accountStatus = company.dwollaAccountStatus
    if (company.dwollaDocumentRequired) documentRequired = company.dwollaDocumentRequired

    if (
      accountStatus === 'verified' &&
      getSafe(() => state.settings.documentsOwner.length, '') &&
      getSafe(() => state.settings.documentsOwner[0].verificationStatus, '') !== 'verified'
    )
      accountStatus = 'documentOwner'
  } else if (company && paymentProcessor === 'VELLOCI') {
    if (company.vellociAccountStatus) accountStatus = company.vellociAccountStatus
    if (company.vellociDocumentRequired) documentRequired = company.vellociDocumentRequired
  }
  //const dwollaAccountStatus = 'document'
  //let documentRequired = 'verify-with-document'

  documentRequired = documentRequired && documentRequired.replace(/-/g, '')
  const hasDwollaAccount = getSafe(() => company.dwollaAccountStatus, '') === 'verified'

  return {
    method: paymentProcessor === 'DWOLLA' ? 'dwolla' : 'velloci',
    paymentProcessor,
    hasDwollaAccount,
    bankAccounts: bankAccountsConfig[accountStatus],
    accountStatus,
    documentRequired,
    loading: state.settings.loading,
    myRows: getSafe(() => state.settings.bankAccountsRows.length, false)
      ? state.settings.bankAccountsRows.map(r => ({
          ...r,
          id: r.account_public_id || r.id,
          rawData: r,
          ...(paymentProcessor === 'DWOLLA'
            ? {
                id: r.account_public_id || r.id,
                name: <div style={{ fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</div>,
                statusLabel: displayStatus(r, preferredBankAccountId),
                accountName: r.name || r.display_name, // this is for search
                bankAccountType: r.account_type
                  ? r.account_type.charAt(0).toUpperCase() + r.account_type.replace('_', ' ').slice(1)
                  : r.bankAccountType
                  ? r.bankAccountType
                  : '',
                bankName: r.institution_name || r.bankName,
                displayName: r.name
              }
            : {
                id: r.account_public_id || r.id,
                name: (
                  <div style={{ fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {r.display_name}
                  </div>
                ),
                bankAccountType: r.account_type
                  ? r.account_type.charAt(0).toUpperCase() + r.account_type.replace('_', ' ').slice(1)
                  : r.bankAccountType
                  ? r.bankAccountType
                  : '',
                bankName: r.institution_name || r.bankName,
                statusLabel: displayStatus(r, preferredBankAccountId),
                accountName: r.name || r.display_name || r.bankName, // this is for search
                displayName: r.display_name
              })
        }))
      : [],
    preferredBankAccountId,
    filterValue: state.settings['bank-accountsFilter'],
    confirmMessage: state.settings.confirmMessage,
    deleteRowById: state.settings.deleteRowById,
    company: company,
    currentUser: state.settings.currentUser,
    tabClicked: state.settings.tabClicked,
    isReloadBankAcounts: state.settings.isReloadBankAcounts,
    isHideInactiveAccounts: state.settings.isHideInactiveAccounts,
    institutId: state.settings.institutId,
    isOpenPopupDeleteInstitution: state.settings.isOpenPopupDeleteInstitution,
    isLoadingAddedAccounts: state.settings.isLoadingAddedAccounts,
    isThirdPartyConnectionException: state.settings.isThirdPartyConnectionException
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(BankAccountsTable))
