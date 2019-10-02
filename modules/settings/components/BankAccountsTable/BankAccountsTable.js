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

import { getSafe } from '~/utils/functions'

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
  dwollaFinalizeVerificationConfirmOpen
} from '../../actions'
import Router from 'next/router'

import { FormattedMessage, injectIntl } from 'react-intl'

import { errorMessages } from '~/constants/yupValidation'

const FinalizeConfirmDialog = confirmable(({ proceed, show, dismiss }) => (

  <Formik
    initialValues={{
      amount1: '',
      amount2: ''
    }}
    validationSchema={Yup.object().shape({
      amount1: Yup.number(errorMessages.mustBeNumber).required(errorMessages.requiredMessage),
      amount2: Yup.number(errorMessages.mustBeNumber).required(errorMessages.requiredMessage)
    })}
    onSubmit={(values) => proceed(values)}
    onReset={dismiss}
    validateOnBlur={false}
    validateOnChange={false}
  >
    {({ handleReset, handleSubmit, isSubmitting }) => (
      <Modal closeIcon onClose={() => dismiss()} size='tiny' centered={false} open={show} onClose={dismiss}>
        <Modal.Header>
          <FormattedMessage id='settings.finalizeVerification' defaultMessage='Finalize Verification' />
        </Modal.Header>
        <Modal.Content>
          <Segment basic loading={isSubmitting}>
            <Form>
              <Header as='h3'>
                <FormattedMessage id='settings.provideAmounts' defaultMessage='Please provide amounts that were transferred to your account' />:
                </Header>
              <Form.Group widths='equal' data-test='settings_bank_account_amounts_inp'>
                <Input label={<FormattedMessage id='settings.amountNum' defaultMessage='Amount 1' values={{ num: 1 }} />} name='amount1' type='number' min='0' />
                <Input label={<FormattedMessage id='settings.amountNum' defaultMessage='Amount 2' values={{ num: 2 }} />} name='amount2' type='number' min='0' />
              </Form.Group>

            </Form>
          </Segment>
        </Modal.Content>
        <Modal.Actions>
          <Button primary inverted onClick={handleReset} data-test='settings_bank_account_cancel_btn'>
            <FormattedMessage id='global.cancel' defaultMessage='Cancel'>{(text) => text}</FormattedMessage>
          </Button>
          <Button primary onClick={handleSubmit} data-test='settings_bank_account_confirm_btn'>
            <FormattedMessage id='global.confirm' defaultMessage='Confirm'>{(text) => text}</FormattedMessage>
          </Button>
        </Modal.Actions>
      </Modal>
    )}

  </Formik>
))


const finalizeConfirm = createConfirmation(FinalizeConfirmDialog)

export const bankAccountsConfig = {
  none: {
    registerButton: true,
    addButton: false,
    dwollaBalance: false,
    searchField: false,
    accountStatus: true,
    bankAccountList: false,
    uploadDocumentsButton: false,
    documentStatus: false
  },
  retry: {
    registerButton: true,
    addButton: false,
    dwollaBalance: false,
    searchField: false,
    accountStatus: true,
    bankAccountList: false,
    uploadDocumentsButton: false,
    documentStatus: false
  },
  document: {
    registerButton: false,
    addButton: false,
    dwollaBalance: false,
    searchField: false,
    accountStatus: true,
    bankAccountList: false,
    uploadDocumentsButton: true,
    documentStatus: true
  },
  verified: {
    registerButton: false,
    addButton: true,
    dwollaBalance: true,
    searchField: true,
    accountStatus: false,
    bankAccountList: true,
    uploadDocumentsButton: false,
    documentStatus: false
  },
  suspended: {
    registerButton: false,
    addButton: false,
    dwollaBalance: false,
    searchField: false,
    accountStatus: true,
    bankAccountList: false,
    uploadDocumentsButton: false,
    documentStatus: false
  },
}

class BankAccountsTable extends Component {
  state = {
    amount1: 0,
    amount2: 0,
    columns: [
      { name: 'name', title: <FormattedMessage id='settings.accountName' defaultMessage='Account Name'>{(text) => text}</FormattedMessage> },
      { name: 'bankAccountType', title: <FormattedMessage id='settings.accountType' defaultMessage='Account Type'>{(text) => text}</FormattedMessage> },
      { name: 'bankName', title: <FormattedMessage id='settings.bankName' defaultMessage='Bank Name'>{(text) => text}</FormattedMessage> },
      { name: 'statusLabel', title: <FormattedMessage id='settings.status' defaultMessage='Status'>{(text) => text}</FormattedMessage> },
    ]
  }

  componentDidMount() {
    this.props.getBankAccountsDataRequest()
    if (this.props.company.hasDwollaAccount) this.props.getDwollaAccBalance()
  }

  render() {
    const {
      rows,
      loading,
      filterValue,
      openPopup,
      deleteBankAccount,
      dwollaInitiateVerification,
      dwollaFinalizeVerification,
      getBankAccountsDataRequest,
      intl,
      bankAccounts,
      dwollaAccountStatus,
      dwollaDocumentRequired
    } = this.props

    let { columns } = this.state
    const { formatMessage } = intl

    return (
      <React.Fragment>
        {bankAccounts.bankAccountList && (
          <ProdexTable
            tableName='settings_bankaccounts'
            rows={rows}
            loading={loading}
            columns={columns}
            filterValue={filterValue}
            rowActions={[
              // { text: 'Edit', callback: row => openPopup(row) },
              {
                text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
                callback: row => confirm(
                  formatMessage({ id: 'confirm.deleteBankAccount', defaultMessage: 'Delete Bank Account' }),
                  formatMessage(
                    { id: 'confirm.deleteItem', defaultMessage: `Do you really want to delete ${row.name}?` },
                    { item: row.name })
                ).then(() => deleteBankAccount(row.id)),
                disabled: row => row.status === 'verification_in_process'
              },
              {
                text: formatMessage({ id: 'settings.initiateVerification', defaultMessage: 'Initiate Verification' }),
                callback: row => dwollaInitiateVerification(row.id),
                hidden: row => row.status !== 'unverified'
              },
              {
                text: formatMessage({ id: 'settings.finalizeVerification', defaultMessage: 'Finalize Verification' }),
                callback: row => {
                  finalizeConfirm().then(v => dwollaFinalizeVerification(row.id, v.amount1, v.amount2))
                },
                hidden: row => row.status !== 'verification_in_process'
              },
            ]}
          />
        )}

        {bankAccounts.accountStatus && (
          <>
            <Table style={{ marginTop: 30, marginBottom: 30 }}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={1}></Table.HeaderCell>
                  <Table.HeaderCell width={4}><FormattedMessage id='dwolla.registrationStatus' defaultMessage='Dwolla Registration Status' /></Table.HeaderCell>
                  <Table.HeaderCell width={10}><FormattedMessage id='dwolla.info' defaultMessage='Info' /></Table.HeaderCell>
                  <Table.HeaderCell width={1}></Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell></Table.Cell>
                  <Table.Cell><FormattedMessage id={`dwolla.registrationStatus.${dwollaAccountStatus}`} /></Table.Cell>
                  <Table.Cell>
                    {bankAccounts.documentStatus ? (
                      <>
                        <FormattedMessage id={`dwolla.info.${dwollaAccountStatus}`} />&nbsp;
                        <FormattedMessage id={`dwolla.document.${dwollaDocumentRequired}`} />
                      </>
                    ) : (
                        <FormattedMessage id={`dwolla.info.${dwollaAccountStatus}`} />
                      )}

                  </Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </>
        )}

        {bankAccounts.documentStatus && (
          <div>
            <FormattedMessage id='dwolla.document.explanatory.header1' >{(text) => <h3>{text}</h3>}</FormattedMessage>
            <FormattedMessage id='dwolla.document.explanatory.text1' >{(text) => <div>{text}</div>}</FormattedMessage>
            <FormattedMessage id='dwolla.document.explanatory.header2' >{(text) => <h3>{text}</h3>}</FormattedMessage>
            <FormattedMessage id='dwolla.document.explanatory.text21' >{(text) => <div>{text}</div>}</FormattedMessage>
            <br></br>
            <li>
              <FormattedMessage id='dwolla.document.explanatory.BoldLi11' >{(text) => <b>{text}</b>}</FormattedMessage>
              <FormattedMessage id='dwolla.document.explanatory.TextLi11' >{(text) => <span>{text}</span>}</FormattedMessage>
            </li>
            <li>
              <FormattedMessage id='dwolla.document.explanatory.BoldLi12' >{(text) => <b>{text}</b>}</FormattedMessage>
              <FormattedMessage id='dwolla.document.explanatory.TextLi12' >{(text) => <span>{text}</span>}</FormattedMessage>
            </li>
            <li>
              <FormattedMessage id='dwolla.document.explanatory.BoldLi13' >{(text) => <b>{text}</b>}</FormattedMessage>
              <FormattedMessage id='dwolla.document.explanatory.TextLi13' >{(text) => <span>{text}</span>}</FormattedMessage>
            </li>
            <FormattedMessage id='dwolla.document.explanatory.text22' >{(text) => <div>{text}</div>}</FormattedMessage>
            <br></br>
            <FormattedMessage id='dwolla.document.explanatory.li21' >{(text) => <li>{text}</li>}</FormattedMessage>
            <FormattedMessage id='dwolla.document.explanatory.li22' >{(text) => <li>{text}</li>}</FormattedMessage>
            <FormattedMessage id='dwolla.document.explanatory.li23' >{(text) => <li>{text}</li>}</FormattedMessage>
            <FormattedMessage id='dwolla.document.explanatory.li24' >{(text) => <li>{text}</li>}</FormattedMessage>
          </div>
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
  dwollaFinalizeVerificationConfirmOpen,
}

const statusToLabel = {
  'verified': <Label color='green' horizontal><FormattedMessage id='settings.verified' defaultMessage='Verified' /></Label>,
  'unverified': <Label color='red' horizontal><FormattedMessage id='settings.unverified' defaultMessage='Unverified' /></Label>,
  'verification_in_process': <Label color='orange' horizontal><FormattedMessage id='settings.verificationInProcess' defaultMessage='Verification in process' /></Label>
}
const mapStateToProps = state => {
  const company = get(state, 'auth.identity.company', null)

  let dwollaDocumentRequired = company && company.dwollaDocumentRequired ? company.dwollaDocumentRequired : 'verify-with-document'
  const dwollaAccountStatus = getSafe(() => company.dwollaAccountStatus, 'none')
  //const dwollaAccountStatus = 'document'
  //let dwollaDocumentRequired = 'verify-with-document'

  dwollaDocumentRequired = dwollaDocumentRequired.replace(/-/g, '')

  return {
    bankAccounts: bankAccountsConfig[dwollaAccountStatus],
    dwollaAccountStatus,
    dwollaDocumentRequired,
    loading: state.settings.loading,
    rows: state.settings.bankAccountsRows.map(r => ({
      ...r,
      statusLabel: statusToLabel[r.status]
      // some changes here
    })),
    filterValue: state.settings.filterValue,
    confirmMessage: state.settings.confirmMessage,
    deleteRowById: state.settings.deleteRowById,
    currentTab: Router && Router.router && Router.router.query && Router.router.query.type ?
      state.settings.tabsNames.find(tab => tab.type === Router.router.query.type) : state.settings.tabsNames[0],
    company: company,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(BankAccountsTable))
