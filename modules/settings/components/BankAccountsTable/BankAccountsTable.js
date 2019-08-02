import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProdexTable from '~/components/table'
import { Header, Modal, Form, Segment, Label } from 'semantic-ui-react'
import { createConfirmation, confirmable } from 'react-confirm'
import confirm from '~/src/components/Confirmable/confirm'
import { Formik } from 'formik'
import { Input, Button } from 'formik-semantic-ui'
import * as Yup from 'yup'

import {
  openPopup,
  getBankAccountsDataRequest,
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

const FinalizeConfirmDialog = confirmable(({ proceed, show, dismiss, intl: { formatMessage } }) => (

  <Formik
    initialValues={{
      amount1: '',
      amount2: ''
    }}
    validationSchema={Yup.object().shape({
      amount1: Yup.number(errorMessages.mustBeNumber).required(errorMessages.requiredMessage),
      amount2: Yup.number(errorMessages.mustBeNumber).required(errorMessages.requiredMessage)
    })}
    onSubmit={(values) => {
      proceed(values)
    }}
    onReset={dismiss}
    validateOnBlur={false}
    validateOnChange={false}
  >
    {({ handleReset, handleSubmit, isSubmitting }) => (
      <Modal size='tiny' centered={false} open={show} onClose={dismiss}>
        <Modal.Header>
          <FormattedMessage id='settings.finalizeVerification' defaultMessage='Finalize Verification' />
        </Modal.Header>
        <Modal.Content>
          <Segment basic loading={isSubmitting}>
            <Form>
              <Header as='h3'>
                <FormattedMessage id='settings.provideAmounts' defaultMessage='Please provide amounts that were transferred to you account' />:
                </Header>
              <Form.Group widths='equal' data-test='settings_bank_account_amounts_inp'>
                <Input label={formatMessage({ id: 'settings.amountNum', defaultMessage: 'Amount 1' }, { num: 1 })} name='amount1' type='number' min='0' />
                <Input label={formatMessage({ id: 'settings.amountNum', defaultMessage: 'Amount 2' }, { num: 2 })} name='amount2' type='number' min='0' />
              </Form.Group>

            </Form>
          </Segment>
        </Modal.Content>
        <Modal.Actions>
          <Button primary inverted onClick={handleReset} data-test='settings_bank_account_cancel_btn'><FormattedMessage id='global.cancel' defaultMessage='Cancel' /></Button>
          <Button primary onClick={handleSubmit} data-test='settings_bank_account_confirm_btn'><FormattedMessage id='global.confirm' defaultMessage='Confirm' /></Button>
        </Modal.Actions>
      </Modal>
    )}

  </Formik>
))


const finalizeConfirm = injectIntl(createConfirmation(FinalizeConfirmDialog))

class ProductCatalogTable extends Component {
  state = {
    amount1: 0,
    amount2: 0,
    columns: [
      { name: 'name', title: <FormattedMessage id='settings.accountName' defaultMessage='Account Name' /> },
      { name: 'bankAccountType', title: <FormattedMessage id='settings.accountType' defaultMessage='Account Type' /> },
      { name: 'bankName', title: <FormattedMessage id='settings.bankName' defaultMessage='Bank Name' /> },
      { name: 'statusLabel', title: <FormattedMessage id='settings.status' defaultMessage='Status' /> },
    ]
  }

  componentDidMount() {
    this.props.getBankAccountsDataRequest()
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
      intl
    } = this.props

    let { columns } = this.state
    const { formatMessage } = intl

    return (
      <React.Fragment>
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
              ).then(() => deleteBankAccount(row.id))
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

      </React.Fragment>
    )
  }
}


const mapDispatchToProps = {
  openPopup,
  getBankAccountsDataRequest,
  handleOpenConfirmPopup,
  closeConfirmPopup,
  deleteBankAccount,
  dwollaInitiateVerification,
  dwollaFinalizeVerification,
  dwollaFinalizeVerificationConfirmOpen,
}

  // ---- TODO ---- React-intl refactor ended here

const statusToLabel = {
  'verified': <Label color='green' horizontal>Verified</Label>,
  'unverified': <Label color='red' horizontal>Unverified</Label>,
  'verification_in_process': <Label color='orange' horizontal>Verification in process</Label>
}
const mapStateToProps = state => {
  return {
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(ProductCatalogTable))
