import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProdexGrid from '~/components/table'
import { withDatagrid } from '~/modules/datagrid'
import { FormattedMessage, injectIntl } from 'react-intl'
import { openSidebar, deleteBranch, getBranch } from '../../actions'
import Router from 'next/router'
import { generateToastMarkup } from '~/utils/functions'
import { withToastManager } from 'react-toast-notifications'
import { Popup, Icon } from 'semantic-ui-react'

import { getSafe } from '~/utils/functions'

import confirm from '~/src/components/Confirmable/confirm'
import { FormattedPhone } from '~/components/formatted-messages/'

class BranchesTable extends Component {
  state = {
    columns: [
      {
        name: 'addressName',
        title: (
          <FormattedMessage id='settings.branchName' defaultMessage='Branch Name'>
            {text => text}
          </FormattedMessage>
        )
      },
      {
        name: 'streetAddress',
        title: (
          <FormattedMessage id='global.streetAddress' defaultMessage='Street Address'>
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
        name: 'provinceName',
        title: (
          <FormattedMessage id='global.stateProvince' defaultMessage='State/Province'>
            {text => text}
          </FormattedMessage>
        )
      },
      {
        name: 'countryName',
        title: (
          <FormattedMessage id='global.country' defaultMessage='Country'>
            {text => text}
          </FormattedMessage>
        )
      },
      {
        name: 'contactName',
        title: (
          <FormattedMessage id='addCompany.contactName' defaultMessage='Contact Name'>
            {text => text}
          </FormattedMessage>
        )
      },
      {
        name: 'phoneFormatted',
        title: (
          <FormattedMessage id='global.phone' defaultMessage='Phone'>
            {text => text}
          </FormattedMessage>
        )
      },
      {
        name: 'contactEmail',
        title: (
          <FormattedMessage id='global.email' defaultMessage='E-mail'>
            {text => text}
          </FormattedMessage>
        )
      }
    ]
  }

  render() {
    const {
      filterValue,
      rows,
      datagrid,
      loading,
      openSidebar,
      deleteBranch,
      intl,
      getBranch
    } = this.props

    const { formatMessage } = intl

    return (
      <React.Fragment>
        <ProdexGrid
          tableName='settings_werehouser_branches'
          {...datagrid.tableProps}
          filterValue={filterValue}
          columns={this.state.columns}
          loading={datagrid.loading}
          rows={rows}
          style={{ marginTop: '5px' }}
          rowActions={[
            {
              text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
              callback: row => {
                const indexTabofSidebar = 0
                getBranch(row.id)
                openSidebar(indexTabofSidebar)
              }
            },
            {
              text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
              callback: row =>
                confirm(
                  formatMessage({ id: 'confirm.deleteBranch', defaultMessage: 'Delete Branch' }),
                  formatMessage(
                    { id: 'confirm.deleteItem', defaultMessage: `Do you really want to delete ${row.addressName}! ? ` },
                    { item: row.name }
                  )
                ).then(() => deleteBranch(row.id))
            }
          ]}
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
        streetAddress: getSafe(() => r.deliveryAddress.address.streetAddress),
        city: getSafe(() => r.deliveryAddress.address.city),
        countryName: getSafe(() => r.deliveryAddress.address.country.name),
        provinceName: getSafe(() => r.deliveryAddress.address.province.name),
        name: getSafe(() => r.deliveryAddress.cfName, ''),
        addressName: <div style={{ fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {getSafe(() => r.deliveryAddress.cfName, '')}
        </div>,
        contactName: getSafe(() => r.deliveryAddress.contactName, ''),
        contactEmail: getSafe(() => r.deliveryAddress.contactEmail, ''),
        phoneFormatted: <FormattedPhone value={getSafe(() => r.deliveryAddress.contactPhone, '')} />,
        id: r.id
      }
    }),
    filterValue: state.settings.filterValue,
    loading: state.settings.loading
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(withToastManager(BranchesTable))))
