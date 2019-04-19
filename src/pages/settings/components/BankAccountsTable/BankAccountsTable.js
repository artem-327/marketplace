import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProdexTable from '~/components/table'
import { Confirm } from 'semantic-ui-react'
import {
  openPopup,
  getBankAccountsDataRequest,
  handleOpenConfirmPopup,
  closePopup,
  deleteConfirmation
} from '../../actions'

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
      confirmMessage,
      openPopup,
      handleOpenConfirmPopup,
      closePopup,
      deleteConfirmation
    } = this.props

    const { columns } = this.state

    return (
      <React.Fragment>
        <Confirm
          size="tiny"
          content="Do you really want to delete this Bank Account?"
          open={confirmMessage}
          onCancel={closePopup}
          onConfirm={deleteConfirmation}
        />
        <ProdexTable
          rows={rows}
          columns={columns}
          filterValue={filterValue}
          rowActions={[
            { text: 'Edit', callback: row => openPopup(row) },
            {
              text: 'Delete',
              callback: row => handleOpenConfirmPopup(row.id)
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
  closePopup,
  deleteConfirmation
}

const mapStateToProps = state => {
  return {
    rows: state.settings.bankAccountsRows,
    filterValue: state.settings.filterValue,
    confirmMessage: state.settings.confirmMessage
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCatalogTable)
