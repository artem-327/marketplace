import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Confirm } from 'semantic-ui-react'

import ProdexGrid from '~/components/table'
import { TablePopUp } from '~/components/tablePopup'

import {
  getDeliveryAddressesRequest,
  openPopup,
  handleOpenConfirmPopup,
  closeConfirmPopup,
  deleteConfirmation,
  openRolesPopup
} from '../../actions'

class DeliveryAddressesTable extends Component {
  state = {
    columns: [
      { name: 'address.streetAddress', title: 'Street Name' },
      { name: 'address.city', title: 'City' },
      { name: 'address.province.name', title: 'Province' },
      { name: 'address.country.name', title: 'Country' },
      { name: 'address.zip.zip', title: 'ZIP Code' },
    ]
  }

  componentDidMount() {
    this.props.getDeliveryAddressesRequest()
  }

  render() {
    const {
      rows,
      filterValue,
      loading,
      openPopup,
      confirmMessage,
      handleOpenConfirmPopup,
      closeConfirmPopup,
      deleteConfirmation
    } = this.props

    const { columns } = this.state

    return (
      <React.Fragment>
        <Confirm
          size="tiny"
          content="Do you really want to delete delivery address?"
          open={confirmMessage}
          onCancel={closeConfirmPopup}
          onConfirm={deleteConfirmation}
        />
        <ProdexGrid
          filterValue={filterValue}
          columns={columns}
          rows={rows}
          loading={loading}
          style={{ marginTop: '5px' }}
          rowActions={[
            { text: 'Edit', callback: row => openPopup(row) },
            { text: 'Delete', callback: row => handleOpenConfirmPopup(row.id) }
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  getDeliveryAddressesRequest,
  openPopup,
  handleOpenConfirmPopup,
  closeConfirmPopup,
  deleteConfirmation
}

const mapStateToProps = state => {
  return {
    rows: state.settings.deliveryAddressesRows,
    filterValue: state.settings.filterValue,
    confirmMessage: state.settings.confirmMessage,
    loading: state.settings.loading

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryAddressesTable)
