import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProdexGrid from '~/components/table'
import { withDatagrid } from '~/modules/datagrid'
import { FormattedMessage, injectIntl } from 'react-intl'
import { openSidebar, deleteBranch, getBranch } from '../../../actions'
import Router from 'next/router'
import { generateToastMarkup } from '~/utils/functions'
import { withToastManager } from 'react-toast-notifications'
import { Popup, Icon } from 'semantic-ui-react'

import { getSafe } from '~/utils/functions'

import confirm from '~/src/components/Confirmable/confirm'
import { FormattedPhone } from '~/components/formatted-messages/'

class PickUpLocationsTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columns: [
        {
          name: 'certificateIcon',
          title: <div></div>,
          width: 45,
          align: 'center',
          caption: <FormattedMessage id='global.productStatusIcon' defaultMessage='Product Status Icon' />
        },
        {
          name: 'addressName',
          title: (
            <FormattedMessage id='settings.pickupLocation' defaultMessage='Pick-Up Location'>
              {text => text}
            </FormattedMessage>
          ),
          width: 170,
          sortPath: 'Branch.deliveryAddress.addressName',
          actions: this.getActions()
        },
        {
          name: 'streetAddress',
          title: (
            <FormattedMessage id='global.streetAddress' defaultMessage='Street Address'>
              {text => text}
            </FormattedMessage>
          ),
          width: 150,
          sortPath: 'Branch.deliveryAddress.address.streetAddress'
        },
        {
          name: 'city',
          title: (
            <FormattedMessage id='global.city' defaultMessage='City'>
              {text => text}
            </FormattedMessage>
          ),
          width: 110,
          sortPath: 'Branch.deliveryAddress.address.city'
        },
        {
          name: 'provinceName',
          title: (
            <FormattedMessage id='global.state' defaultMessage='State'>
              {text => text}
            </FormattedMessage>
          ),
          width: 100,
          sortPath: 'Branch.deliveryAddress.address.province.name'
        },
        {
          name: 'countryName',
          title: (
            <FormattedMessage id='global.country' defaultMessage='Country'>
              {text => text}
            </FormattedMessage>
          ),
          width: 90,
          sortPath: 'Branch.deliveryAddress.address.country.name'
        },
        {
          name: 'contactName',
          title: (
            <FormattedMessage id='addCompany.contactName' defaultMessage='Contact Name'>
              {text => text}
            </FormattedMessage>
          ),
          width: 140,
          sortPath: 'Branch.deliveryAddress.contactName'
        },
        {
          name: 'phoneFormatted',
          title: (
            <FormattedMessage id='global.phone' defaultMessage='Phone'>
              {text => text}
            </FormattedMessage>
          ),
          width: 120,
          sortPath: 'Branch.deliveryAddress.contactPhone'
        },
        {
          name: 'contactEmail',
          title: (
            <FormattedMessage id='global.email' defaultMessage='E-mail'>
              {text => text}
            </FormattedMessage>
          ),
          width: 170,
          sortPath: 'Branch.deliveryAddress.contactEmail'
        }
      ]
    }
  }

  getRows = rows => {
    return rows.map(r => ({
      ...r,
      certificateIcon:
        getSafe(() => r.attachments.length, false) && getSafe(() => r.countryName, false) === 'USA' ? (
          <Popup
            position='right center'
            header={
              <FormattedMessage
                id='settings.warehouse.certificateIcon.header'
                defaultMessage='Certificate is attached and so will be visible anywhere'
              />
            }
            trigger={
              <div>
                <Icon className='file related' />
              </div>
            }
          />
        ) : null
    }))
  }

  getActions = () => {
    const { openSidebar, deleteBranch, intl, datagrid } = this.props

    const { formatMessage } = intl
    return [
      {
        text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
        callback: row => {
          const indexTabofSidebar = 0
          getBranch(row.id)
          openSidebar(row.rawData, indexTabofSidebar)
        }
      },
      {
        text: formatMessage({ id: 'global.certificates', defaultMessage: 'Certificates' }),
        callback: row => {
          const indexTabofSidebar = 1
          getBranch(row.id)
          openSidebar(row.rawData, indexTabofSidebar)
        }
      },
      {
        text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
        callback: row =>
          confirm(
            formatMessage({ id: 'confirm.deleteWarehouse', defaultMessage: 'Delete Warehouse' }),
            formatMessage(
              { id: 'confirm.deleteItem', defaultMessage: `Do you really want to delete ${row.addressName}! ? ` },
              { item: row.name }
            )
          ).then(async () => {
            try {
              await deleteBranch(row.id)
              datagrid.removeRow(row.id)
            } catch (e) {
              console.error(e)
            }
          }),
        disabled: row => this.props.editedId === row.id
      }
    ]
  }

  render() {
    const { filterValue, rows, datagrid, editedId } = this.props

    return (
      <React.Fragment>
        <ProdexGrid
          tableName='settings_pickup_locations'
          {...datagrid.tableProps}
          filterValue={filterValue}
          columns={this.state.columns}
          loading={datagrid.loading}
          rows={this.getRows(rows)}
          style={{ marginTop: '5px' }}
          columnActions='addressName'
          editingRowId={editedId}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  openSidebar,
  deleteBranch,
  getBranch
}

const mapStateToProps = (state, { datagrid }) => {
  return {
    rows: datagrid.rows.map(r => {
      return {
        rawData: r,
        streetAddress: getSafe(() => r.deliveryAddress.address.streetAddress),
        city: getSafe(() => r.deliveryAddress.address.city),
        countryName: getSafe(() => r.deliveryAddress.address.country.name),
        provinceName: getSafe(() => r.deliveryAddress.address.province.name),
        name: getSafe(() => r.deliveryAddress.cfName, ''),
        addressName: (
          <div style={{ fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {getSafe(() => r.deliveryAddress.cfName, '')}
          </div>
        ),
        contactName: getSafe(() => r.deliveryAddress.contactName, ''),
        contactEmail: getSafe(() => r.deliveryAddress.contactEmail, ''),
        phoneFormatted: <FormattedPhone value={getSafe(() => r.deliveryAddress.contactPhone, '')} />,
        id: r.id,
        attachments: r.attachments
      }
    }),
    filterValue: state.settings.filterValue,
    editedId: state.settings.editedId,
    loading: state.settings.loading
  }
}

export default withDatagrid(
  connect(mapStateToProps, mapDispatchToProps)(injectIntl(withToastManager(PickUpLocationsTable)))
)
