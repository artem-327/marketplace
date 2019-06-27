import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Confirm } from 'semantic-ui-react'

import ProdexGrid from '~/components/table'
import confirm from '~/src/components/Confirmable/confirm'
import { injectIntl } from 'react-intl'
import { withDatagrid } from '~/modules/datagrid'

// import { TablePopUp } from '~/components/tablePopup'

import {
  getDeliveryAddressesByFilterRequest,
  deleteDeliveryAddress,
  openPopup,
  // handleOpenConfirmPopup,
  // closeConfirmPopup,
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
    // this.props.getDeliveryAddressesByFilterRequest(this.props.deliveryAddressesFilter)
  }

  render() {
    const {
      datagrid,
      rows,
      filterValue,
      loading,
      openPopup,
      intl,
      deleteDeliveryAddress
      // reloadFilter,
      // confirmMessage,
      // handleOpenConfirmPopup,
      // closeConfirmPopup,
      // deleteDeliveryAddressesItem,
      // deleteRowById
    } = this.props

    let { columns } = this.state
    const { formatMessage } = intl

    return (
      <React.Fragment>
        <ProdexGrid
          tableName="settings_delivery_address"
          {...datagrid.tableProps}
          // filterValue={filterValue}
          columns={columns}
          rows={rows}
          loading={datagrid.loading || loading}
          style={{ marginTop: '5px' }}
          rowActions={[
            { text: 'Edit', callback: row => openPopup(row.data) },
            {
              text: 'Delete', callback: row => confirm(
                formatMessage({ id: 'confirm.deleteDeliveryAddress', defaultMessage: 'Delete Delivery Address' }),
                formatMessage(
                  { id: 'confirm.deleteItem', defaultMessage: `Do you really want to delete ${row.streetAddress}?` },
                  { item: row.streetAddress })
              ).then(() => { 
                deleteDeliveryAddress(row.id) 
              })

            }
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  getDeliveryAddressesByFilterRequest,
  deleteDeliveryAddress,
  openPopup
}

const mapStateToProps = (state, { datagrid }) => {
  return {
    filterValue: state.settings.filterValue,
    confirmMessage: state.settings.confirmMessage,
    deleteRowById: state.settings.deleteRowById,
    deliveryAddressesFilter: state.settings.deliveryAddressesFilter,
    loading: state.settings.loading,
    rows: datagrid.rows.map(d => {
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
    reloadFilter: {
      props: {
        currentTab: Router && Router.router && Router.router.query && Router.router.query.type ?
          state.settings.tabsNames.find(tab => tab.type === Router.router.query.type) : state.settings.tabsNames[0],
        deliveryAddressesFilter: state.settings.deliveryAddressesFilter
      },
      value: state.settings.filterValue
    },
  }
}

export default withDatagrid(connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(DeliveryAddressesTable)))
