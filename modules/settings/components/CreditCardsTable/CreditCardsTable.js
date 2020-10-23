import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProdexTable from '~/components/table'
import { Confirm } from 'semantic-ui-react'
import { getCreditCardsDataRequest, handleOpenConfirmPopup, closeConfirmPopup } from '../../actions'
import Router from 'next/router'
import { FormattedMessage, injectIntl } from 'react-intl'

class ProductCatalogTable extends Component {
  state = {
    columns: [
      { name: 'cardNumber', title: <FormattedMessage id='settings.cardNumber' defaultMessage='Card Number' /> },
      {
        name: 'expMonthYear',
        title: <FormattedMessage id='settings.expMonthYear' defaultMessage='Expiration month/year' />
      }
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
      deleteRowById,
      loading,
      intl: { formatMessage }
    } = this.props

    const { columns } = this.state

    return (
      <React.Fragment>
        <Confirm
          size='tiny'
          content={formatMessage({
            id: 'settings.deleteCreditCardConfirm',
            defaultMessage: 'Do you really want to delete this Credit Card?'
          })}
          open={confirmMessage}
          onCancel={closeConfirmPopup}
          onConfirm={() => console.log('Delete Confirmation Credit Card')} //This function  deleteConfirmation(deleteRowById, currentTab) was commented in actions.js
        />
        <ProdexTable
          tableName='settings_credit_cards'
          rows={rows}
          loading={loading}
          columns={columns}
          filterValue={filterValue}
          rowActions={[
            {
              text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
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
  closeConfirmPopup
}

const mapStateToProps = state => {
  return {
    rows: state.settings.creditCardsRows,
    loading: state.settings.loading,
    filterValue: state.settings.filterValue,
    confirmMessage: state.settings.confirmMessage,
    deleteRowById: state.settings.deleteRowById
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ProductCatalogTable))
