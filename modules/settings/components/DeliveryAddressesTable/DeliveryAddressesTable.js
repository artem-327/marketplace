import React, { Component } from 'react'
import { connect } from 'react-redux'

import ProdexGrid from '~/components/table'
import confirm from '~/src/components/Confirmable/confirm'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withDatagrid } from '~/modules/datagrid'

// import { TablePopUp } from '~/components/tablePopup'

import { getSafe } from '~/utils/functions'

import {
  getDeliveryAddressesByFilterRequest,
  deleteDeliveryAddress,
  openPopup
  // handleOpenConfirmPopup,
  // closeConfirmPopup,
} from '../../actions'
import Router from 'next/router'

class DeliveryAddressesTable extends Component {
  state = {
    columns: [
      {
        name: 'streetAddress',
        title: (
          <FormattedMessage id='global.streetName' defaultMessage='Street Name'>
            {text => text}
          </FormattedMessage>
        )
      },
      {
        name: 'city',
        title: (
          <FormattedMessage id='global.city' defaultMessage='City'>
            {text => text}
          </FormattedMessage>
        )
      },
      {
        name: 'province',
        title: (
          <FormattedMessage id='global.stateProvince' defaultMessage='State/Province'>
            {text => text}
          </FormattedMessage>
        )
      },
      {
        name: 'country',
        title: (
          <FormattedMessage id='global.country' defaultMessage='Country'>
            {text => text}
          </FormattedMessage>
        )
      },
      {
        name: 'zip',
        title: (
          <FormattedMessage id='global.zipCode' defaultMessage='ZIP Code'>
            {text => text}
          </FormattedMessage>
        )
      }
    ]
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
          tableName='settings_delivery_address'
          {...datagrid.tableProps}
          // filterValue={filterValue}
          columns={columns}
          rows={rows}
          loading={datagrid.loading || loading}
          style={{ marginTop: '5px' }}
          rowActions={[
            {
              text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
              callback: row => openPopup(row.data)
            },
            {
              text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
              callback: row =>
                confirm(
                  formatMessage({ id: 'confirm.deleteDeliveryAddress', defaultMessage: 'Delete Delivery Address' }),
                  formatMessage(
                    { id: 'confirm.deleteItem', defaultMessage: `Do you really want to delete ${row.streetAddress}?` },
                    { item: row.streetAddress }
                  )
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
        data: d, // all row data, used for edit popup
        id: d.id,
        streetAddress: getSafe(() => d.address.streetAddress, ''),
        city: getSafe(() => d.address.city, ''),
        province: getSafe(() => d.address.province.name, ''),
        country: getSafe(() => d.address.country.name, ''),
        zip: getSafe(() => d.address.zip.zip, '')
      }
    }),
    // reloadFilter is used to reload Delivery addresses list after Edit / Add new Delivery address
    reloadFilter: {
      props: {
        currentTab:
          Router && Router.router && Router.router.query && Router.router.query.type
            ? state.settings.tabsNames.find(tab => tab.type === Router.router.query.type)
            : state.settings.tabsNames[0],
        deliveryAddressesFilter: state.settings.deliveryAddressesFilter
      },
      value: state.settings.filterValue
    }
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(DeliveryAddressesTable)))
