import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Confirm } from 'semantic-ui-react'

import ProdexGrid from '~/components/table'
import { TablePopUp } from '~/components/tablePopup'

import {
  getDeliveryAddressesByFilterRequest,
  openPopup,
  handleOpenConfirmPopup,
  closeConfirmPopup,
  deleteDeliveryAddressesItem
} from '../../actions'

class DeliveryAddressesTable extends Component {
  state = {
    columns: [
      { name: 'streetAddress', title: 'Street Name' },
      { name: 'city', title: 'City' },
      { name: 'province', title: 'Province' },
      { name: 'country', title: 'Country' },
      { name: 'zip', title: 'ZIP Code' },
    ]
  }

  componentDidMount() {
    this.props.getDeliveryAddressesByFilterRequest(this.props.deliveryAddressesFilter)
  }

  render() {
    const {
      rows,
      filterValue,
      loading,
      openPopup,
      reloadFilter,
      confirmMessage,
      handleOpenConfirmPopup,
      closeConfirmPopup,
      deleteDeliveryAddressesItem,
      deleteRowByid
    } = this.props

    const { columns } = this.state

    return (
      <React.Fragment>
        <Confirm
          size="tiny"
          content="Do you really want to delete delivery address?"
          open={confirmMessage}
          onCancel={closeConfirmPopup}
          onConfirm={() => deleteDeliveryAddressesItem(deleteRowByid, reloadFilter)}
        />
        <ProdexGrid
          filterValue={filterValue}
          columns={columns}
          rows={rows}
          loading={loading}
          style={{ marginTop: '5px' }}
          rowActions={[
            { text: 'Edit', callback: row => openPopup(row.data) },
            { text: 'Delete', callback: row => handleOpenConfirmPopup(row.id) }
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  getDeliveryAddressesByFilterRequest,
  openPopup,
  handleOpenConfirmPopup,
  closeConfirmPopup,
  deleteDeliveryAddressesItem
}

const mapStateToProps = state => {
  return {
    filterValue: state.settings.filterValue,
    confirmMessage: state.settings.confirmMessage,
    deliveryAddressesFilter: state.settings.deliveryAddressesFilter,
    loading: state.settings.loading,
    rows: state.settings.deliveryAddressesRows.map( d=> {
      return {
        data: d,   // all row data, used for edit popup
        streetAddress: d.address.streetAddress,
        city: d.address.city,
        province: !!d.address.province ? d.address.province.name : '',
        country: d.address.country.name,
        zip: d.address.zip.zip,
      }
    }),
    deleteRowByid: state.settings.deleteRowByid,
    // reloadFilter is used to reload CAS Product list after Edit / Add new CAS Product
    reloadFilter: {props: {
        currentTab: state.settings.currentTab,
        casListDataRequest: state.settings.deliveryAddressesFilter},
      value: state.settings.filterValue},
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryAddressesTable)
