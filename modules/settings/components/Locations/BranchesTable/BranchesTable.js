import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProdexGrid from '~/components/table'
import { withDatagrid } from '~/modules/datagrid'
import { FormattedMessage, injectIntl } from 'react-intl'
import { openSidebar, deleteBranch, getBranch, setPrimaryBranch } from '../../../actions'
import { generateToastMarkup } from '~/utils/functions'
import { withToastManager } from 'react-toast-notifications'
import { getIdentity } from '~/modules/auth/actions'

import { getSafe } from '~/utils/functions'

import confirm from '~/src/components/Confirmable/confirm'
import { FormattedPhone } from '~/components/formatted-messages/'

class BranchesTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columns: [
        {
          name: 'addressName',
          title: (
            <FormattedMessage id='settings.branchName' defaultMessage='Branch Name'>
              {text => text}
            </FormattedMessage>
          ),
          width: 210,
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

  getActions = () => {
    const {
      datagrid,
      openSidebar,
      deleteBranch,
      intl,
      getBranch,
      currentCompanyId,
      currentPrimaryBranchId,
      setPrimaryBranch,
      getIdentity,
      isCompanyAdmin
    } = this.props

    const { formatMessage } = intl
    return [
      {
        text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
        callback: row => {
          getBranch(row.id)
          openSidebar(row)
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
          ).then(async () => {
            try {
              await deleteBranch(row.id)
              datagrid.removeRow(row.id)
            } catch (e) {
              console.error(e)
            }
          }),
        disabled: row => this.props.editedId === row.id
      },
      {
        text: <FormattedMessage id='settings.branches.setAsPrimaryBranch' defaultMessage='Set as Primary Branch' />,
        callback: async row => {
          try {
            const { value } = await setPrimaryBranch(currentCompanyId, row.id)
            getIdentity()
            datagrid.loadData()
          } catch (e) {
            console.error(e)
          }
        },
        hidden: row => !isCompanyAdmin || currentPrimaryBranchId === row.id
      }
    ]
  }

  render() {
    const { filterValue, rows, datagrid, loading, identityLoading, editedId } = this.props

    return (
      <React.Fragment>
        <ProdexGrid
          tableName='settings_branches'
          {...datagrid.tableProps}
          filterValue={filterValue}
          columns={this.state.columns}
          loading={datagrid.loading || loading || identityLoading}
          rows={rows}
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
  getBranch,
  setPrimaryBranch,
  getIdentity
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
        addressName: (
          <div style={{ fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {getSafe(() => r.deliveryAddress.cfName, '')}
          </div>
        ),
        contactName: getSafe(() => r.deliveryAddress.contactName, ''),
        contactEmail: getSafe(() => r.deliveryAddress.contactEmail, ''),
        phoneFormatted: <FormattedPhone value={getSafe(() => r.deliveryAddress.contactPhone, '')} />,
        id: r.id
      }
    }),
    filterValue: state.settings.filterValue,
    loading: state.settings.loading,
    editedId: state.settings.editedId,
    currentCompanyId: getSafe(() => state.auth.identity.company.id, null),
    currentPrimaryBranchId: getSafe(() => state.auth.identity.company.primaryBranch.id, null),
    isCompanyAdmin: getSafe(() => state.auth.identity.isCompanyAdmin, false),
    identityLoading: getSafe(() => state.auth.loading, false)
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(withToastManager(BranchesTable))))
