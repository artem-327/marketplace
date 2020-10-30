import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProdexTable from '~/components/table'
import { Header, Modal, Form, Segment, Label, Table } from 'semantic-ui-react'
import { createConfirmation, confirmable } from 'react-confirm'
import confirm from '~/src/components/Confirmable/confirm'
import { Formik } from 'formik'
import { Input, Button } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import get from 'lodash/get'
import styled from 'styled-components'
import { getSafe } from '~/utils/functions'
import { getIdentity } from '~/modules/auth/actions'

import {
  openPopup,
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
  reloadBankAccounts
} from '../../actions'

import { FormattedMessage, injectIntl } from 'react-intl'

import { errorMessages } from '~/constants/yupValidation'

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

const StatusLabel = styled(Label)`
  height: 22px;
  border-radius: 11px !important;
  font-size: 12px !important;
  font-weight: normal !important;
  font-stretch: normal !important;
  font-style: normal !important;
  text-align: center !important;
  color: #ffffff !important;
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
    addButton: false,
    balance: false,
    searchField: false,
    accountStatus: true,
    bankAccountList: false,
    uploadDocumentsButton: false,
    documentStatus: false
  },
  member_pending: {
    registerButton: false,
    addButton: false,
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.tabClicked !== prevProps.tabClicked || this.props.isReloadBankAcounts) {
      this.props.getBankAccountsDataRequest(this.props.paymentProcessor)
      this.props.getCurrentUser()
      this.props.getIdentity().then(resp => {
        getSafe(() => resp.value.identity.company.dwollaAccountStatus, '') === 'verified' &&
          this.props.getDwollaAccBalance()
        getSafe(() => resp.value.identity.company.vellociAccountStatus, '') === 'verified' &&
          this.props.getVellociAccBalance()
      })
      this.props.reloadBankAccounts(false)
    }
  }

  getColumns = () => [
    { name: 'accountName', disabled: true },
    {
      name: 'name',
      title: (
        <FormattedMessage id='settings.accountName' defaultMessage='Account Name'>
          {text => text}
        </FormattedMessage>
      ),
      actions: this.getActions()
    },
    {
      name: 'bankAccountType',
      title: (
        <FormattedMessage id='settings.accountType' defaultMessage='Account Type'>
          {text => text}
        </FormattedMessage>
      )
    },
    {
      name: 'bankName',
      title: (
        <FormattedMessage id='settings.bankName' defaultMessage='Bank Name'>
          {text => text}
        </FormattedMessage>
      )
    },
    {
      name: 'statusLabel',
      title: (
        <FormattedMessage id='settings.status' defaultMessage='Status'>
          {text => text}
        </FormattedMessage>
      )
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
                defaultMessage: `Do you really want to delete ${row.rawData.name}?`
              },
              { item: row.rawData.name }
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
          defaultMessage: 'Set as Preferred Bank Account'
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

  render() {
    const { myRows, loading, filterValue, intl, bankAccounts, method, accountStatus, documentRequired } = this.props

    return (
      <React.Fragment>
        {bankAccounts.bankAccountList && !bankAccounts.documentOwner && (
          <ProdexTable
            tableName='settings_bankaccounts'
            rows={myRows}
            loading={loading}
            columns={this.getColumns()}
            filterValue={filterValue}
            columnActions='name'
          />
        )}

        {(bankAccounts.accountStatus || bankAccounts.documentStatus) && (
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
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  openPopup,
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
  reloadBankAccounts
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
    myRows: state.settings.bankAccountsRows.map(r => ({
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
            bankName: r.institution_name || r.bankName
          }
        : {
            id: r.account_public_id || r.id,
            name: (
              <div style={{ fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.display_name}</div>
            ),
            bankAccountType: r.account_type
              ? r.account_type.charAt(0).toUpperCase() + r.account_type.replace('_', ' ').slice(1)
              : r.bankAccountType
              ? r.bankAccountType
              : '',
            bankName: r.institution_name || r.bankName,
            statusLabel: displayStatus(r, preferredBankAccountId),
            accountName: r.name || r.display_name || r.bankName // this is for search
          })
    })),
    preferredBankAccountId,
    filterValue: state.settings['bank-accountsFilter'],
    confirmMessage: state.settings.confirmMessage,
    deleteRowById: state.settings.deleteRowById,
    company: company,
    currentUser: state.settings.currentUser,
    tabClicked: state.settings.tabClicked,
    isReloadBankAcounts: state.settings.isReloadBankAcounts
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(BankAccountsTable))
