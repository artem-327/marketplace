import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProdexTable from '~/components/table'

import confirm from '~/src/components/Confirmable/confirm'

import {
  openPopup,
  getBankAccountsDataRequest,
  handleOpenConfirmPopup,
  closeConfirmPopup,
  deleteConfirmation,
  deleteBankAccount,
  dwollaInitiateVerification,
  dwollaFinalizeVerification
} from '../../actions'
import Router from "next/router"

import { injectIntl } from 'react-intl'

class ProductCatalogTable extends Component {
  state = {
    columns: [
      { name: 'name', title: 'Account Name' },
      { name: 'bankAccountType', title: 'Account Type' },
      { name: 'bankName', title: 'Bank Name' },
      { name: 'status', title: 'Status' },
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
      intl
    } = this.props

    let { columns } = this.state
    const { formatMessage } = intl


    return (
      <React.Fragment>
        <ProdexTable
          tableName="settings_bankaccounts"
          rows={rows}
          loading={loading}
          columns={columns}
          filterValue={filterValue}
          rowActions={[
            // { text: 'Edit', callback: row => openPopup(row) },
            {
              text: 'Delete',
              callback: row => confirm(
                formatMessage({ id: 'confirm.deleteBankAccount', defaultMessage: 'Delete Bank Account' }),
                formatMessage(
                  { id: 'confirm.deleteItem', defaultMessage: `Do you really want to delete ${row.name}?` },
                  { item: row.name })
              ).then(() => deleteBankAccount(row.id))
            },
            { text: 'Initiate Verification', callback: row => dwollaInitiateVerification(row.id), hidden: row => row.status !== 'unverified'}, 
            { text: 'Finalize Verification', callback: row => dwollaFinalizeVerification(row.id), hidden: row => row.status !== 'verification_in_process' }, 
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
  dwollaFinalizeVerification
}

const mapStateToProps = state => {
  return {
    loading: state.settings.loading,
    rows: state.settings.bankAccountsRows.map(r => ({
      ...r,
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
