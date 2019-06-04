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
import Router from "next/router"

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
      deleteRowById
    } = this.props

    const { columns } = this.state

    return (
      <React.Fragment>
        <Confirm
          size="tiny"
          content="Do you really want to delete delivery address?"
          open={confirmMessage}
          onCancel={closeConfirmPopup}
          onConfirm={() => deleteDeliveryAddressesItem(deleteRowById, reloadFilter)}
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
    deleteRowById: state.settings.deleteRowById,
    deliveryAddressesFilter: state.settings.deliveryAddressesFilter,
    loading: state.settings.loading,
    rows: state.settings.deliveryAddressesRows.map( d=> {
      return {
        data: d,   // all row data, used for edit popup
        id: d.id,
        streetAddress: d.address.streetAddress,
        city: d.address.city,
        province: !!d.address.province ? d.address.province.name : '',
        country: d.address.country.name,
        zip: d.address.zip.zip,
      }
    }),
    // reloadFilter is used to reload Delivery addresses list after Edit / Add new Delivery address
    reloadFilter: {props: {
        currentTab: Router && Router.router ? state.settings.tabsNames.find(tab => tab.type === Router.router.query.type) : state.settings.tabsNames[0],
        deliveryAddressesFilter: state.settings.deliveryAddressesFilter},
      value: state.settings.filterValue},
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryAddressesTable)
