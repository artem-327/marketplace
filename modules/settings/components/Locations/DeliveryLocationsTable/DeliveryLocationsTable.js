import React, { Component } from 'react'
import { connect } from 'react-redux'

import ProdexGrid from '~/components/table'
import confirm from '~/src/components/Confirmable/confirm'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withDatagrid } from '~/modules/datagrid'

// import { TablePopUp } from '~/components/tablePopup'

import { getSafe } from '~/utils/functions'

import { getDeliveryAddressesByFilterRequest, deleteDeliveryAddress, openSidebar } from '../../../actions'
import Router from 'next/router'

class DeliveryAddressesTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columns: [
        {
          name: 'streetAddress',
          title: (
            <FormattedMessage id='global.streetName' defaultMessage='Street Name'>
              {text => text}
            </FormattedMessage>
          ),
          width: 330,
          sortPath: 'DeliveryAddress.address.streetAddress',
          actions: this.getActions()
        },
        {
          name: 'city',
          title: (
            <FormattedMessage id='global.city' defaultMessage='City'>
              {text => text}
            </FormattedMessage>
          ),
          width: 190,
          sortPath: 'DeliveryAddress.address.city'
        },
        {
          name: 'province',
          title: (
            <FormattedMessage id='global.stateProvince' defaultMessage='State/Province'>
              {text => text}
            </FormattedMessage>
          ),
          width: 230,
          sortPath: 'DeliveryAddress.address.province.name'
        },
        {
          name: 'country',
          title: (
            <FormattedMessage id='global.country' defaultMessage='Country'>
              {text => text}
            </FormattedMessage>
          ),
          width: 190,
          sortPath: 'DeliveryAddress.address.country.name'
        },
        {
          name: 'zip',
          title: (
            <FormattedMessage id='global.zipCode' defaultMessage='ZIP Code'>
              {text => text}
            </FormattedMessage>
          ),
          width: 190,
          sortPath: 'DeliveryAddress.address.zip.zip'
        }
      ]
    }
  }

  getActions = () => {
    const { openSidebar, intl, deleteDeliveryAddress } = this.props

    const { formatMessage } = intl
    return [
      {
        text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
        callback: row => openSidebar(row.rawData)
      },
      {
        text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
        callback: row =>
          confirm(
            formatMessage({ id: 'confirm.deleteDeliveryAddress', defaultMessage: 'Delete Delivery Address' }),
            formatMessage(
              {
                id: 'confirm.deleteItem',
                defaultMessage: `Do you really want to delete ${row.streetAddressString}?`
              },
              { item: row.streetAddressString }
            )
          ).then(() => {
            deleteDeliveryAddress(row.id)
          })
      }
    ]
  }

  render() {
    const { datagrid, rows, loading, intl } = this.props

    let { columns } = this.state

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
          columnActions='streetAddress'
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  getDeliveryAddressesByFilterRequest,
  deleteDeliveryAddress,
  openSidebar
}

const mapStateToProps = (state, { datagrid }) => {
  return {
    filterValue: state.settings.filterValue,
    loading: state.settings.loading,
    rows: datagrid.rows.map(d => {
      const streetAddress = getSafe(() => d.address.streetAddress, '')
      return {
        rawData: d, // all row data, used for edit popup
        streetAddressString: streetAddress,
        id: d.id,
        streetAddress: (
          <div style={{ fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis' }}>{streetAddress}</div>
        ),
        city: getSafe(() => d.address.city, ''),
        province: getSafe(() => d.address.province.name, ''),
        country: getSafe(() => d.address.country.name, ''),
        zip: getSafe(() => d.address.zip.zip, '')
      }
    })
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(DeliveryAddressesTable)))
