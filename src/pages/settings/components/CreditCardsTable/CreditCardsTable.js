import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProdexTable from '~/components/table'
import { Confirm } from 'semantic-ui-react'
import {
  getCreditCardsDataRequest,
  handleOpenConfirmPopup,
  closeConfirmPopup,
  deleteConfirmation
} from '../../actions'

class ProductCatalogTable extends Component {
  state = {
    columns: [
      { name: 'cardNumber', title: 'Card Number' },
      { name: 'expMonthYear', title: 'expMonth / expYear' }
    ]
  }

  componentDidMount() {
    this.props.getCreditCardsDataRequest()
  }

  render() {
    const {
      rows,
      filterValue,
      confirmMessage,
      handleOpenConfirmPopup,
      closeConfirmPopup,
      deleteConfirmation,
      deleteRowById,
      currentTab
    } = this.props

    const { columns } = this.state

    return (
      <React.Fragment>
        <Confirm
          size="tiny"
          content="Do you really want to delete this Credit Card?"
          open={confirmMessage}
          onCancel={closeConfirmPopup}
          onConfirm={() => deleteConfirmation(deleteRowById, currentTab)}
        />
        <ProdexTable
          rows={rows}
          columns={columns}
          filterValue={filterValue}
          rowActions={[
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
  getCreditCardsDataRequest,
  handleOpenConfirmPopup,
  closeConfirmPopup,
  deleteConfirmation
}

const mapStateToProps = state => {
  return {
    rows: state.settings.creditCardsRows,
    filterValue: state.settings.filterValue,
    confirmMessage: state.settings.confirmMessage,
    deleteRowById: state.settings.deleteRowById,
    currentTab: state.settings.currentTab,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCatalogTable)
