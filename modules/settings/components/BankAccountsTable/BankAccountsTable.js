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
  deleteBankAccount
} from '../../actions'
import Router from "next/router"

import { injectIntl } from 'react-intl'

class ProductCatalogTable extends Component {
  state = {
    columns: [
      { name: 'accountNumber', title: 'Account Number' },
      { name: 'accountHolderName', title: 'Account Name' },
      { name: 'currency', title: 'Currency' }
    ]
  }

  componentDidMount() {
    this.props.getBankAccountsDataRequest()
  }

  render() {
    const {
      rows,
      filterValue,
      openPopup,
      deleteBankAccount,
      intl,
      // confirmMessage,
      // handleOpenConfirmPopup,
      // closeConfirmPopup,
      // deleteConfirmation,
      // deleteRowById,
      // currentTab
    } = this.props

    let { columns } = this.state
    const { formatMessage } = intl

    return (
      <React.Fragment>
        <ProdexTable
          rows={rows}
          columns={columns}
          filterValue={filterValue}
          rowActions={[
            { text: 'Edit', callback: row => openPopup(row) },
            {
              text: 'Delete',
              callback: row => confirm(
                formatMessage({ id: 'confirm.deleteBankAccount', defaultMessage: 'Delete Bank Account' }),
                formatMessage(
                  { id: 'confirm.deleteItem', defaultMessage: `Do you really want to delete ${row.name}?` },
                  { item: row.name })
              ).then(() => deleteBankAccount(row.id))
            }
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
  deleteBankAccount
}

const mapStateToProps = state => {
  return {
    rows: state.settings.bankAccountsRows,
    filterValue: state.settings.filterValue,
    confirmMessage: state.settings.confirmMessage,
    deleteRowById: state.settings.deleteRowById,
    currentTab: Router && Router.router ? state.settings.tabsNames.find(tab => tab.type === Router.router.query.type) : state.settings.tabsNames[0],
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(ProductCatalogTable))
