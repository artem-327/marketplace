import React, { Component } from 'react'
import { connect } from 'react-redux'
import confirm from '~/src/components/Confirmable/confirm'
import { injectIntl } from 'react-intl'
import { withDatagrid } from '~/modules/datagrid'
import ProdexTable from '~/components/table'
import { Checkbox } from 'semantic-ui-react'
import { getSafe } from '~/utils/functions'
import { FormattedMessage } from 'react-intl'
import Router from 'next/router'
import { ArrayToFirstItem } from '~/components/formatted-messages/'
import * as Actions from '../actions'
import AddEditCompanySidebar from './AddEditCompanySidebar'

const columns = [
  {
    name: 'displayName',
    title: (
      <FormattedMessage id='global.companyName' defaultMessage='Company Name'>
        {text => text}
      </FormattedMessage>
    ),
    width: 220,
    sortPath: 'Company.name'
  },
  {
    name: 'associations',
    title: (
      <FormattedMessage id='admin.associations' defaultMessage='Associations'>
        {text => text}
      </FormattedMessage>
    ),
    width: 165
  },
  {
    name: 'primaryBranchAddress',
    title: (
      <FormattedMessage id='global.headquaterAddress' defaultMessage='Headquarters Address'>
        {text => text}
      </FormattedMessage>
    ),
    width: 185,
    sortPath: 'Company.primaryBranch.deliveryAddress.address.streetAddress'
  },
  {
    name: 'primaryContact',
    title: (
      <FormattedMessage id='global.primaryContact' defaultMessage='Primary Contact'>
        {text => text}
      </FormattedMessage>
    ),
    width: 150,
    sortPath: 'ClientCompany.primaryBranch.deliveryAddress.contactName'
  },
  {
    name: 'contactEmail',
    title: (
      <FormattedMessage id='global.contactEmail' defaultMessage='Contact E-mail'>
        {text => text}
      </FormattedMessage>
    ),
    width: 175,
    sortPath: 'ClientCompany.primaryBranch.deliveryAddress.contactEmail'
  },
  {
    name: 'hasDwollaAccount',
    title: (
      <FormattedMessage id='global.dwollaAccount' defaultMessage='Dwolla Account'>
        {text => text}
      </FormattedMessage>
    ),
    width: 145
  },
  {
    name: 'hasLogisticsAccounts',
    title: (
      <FormattedMessage id='global.logisticAccounts' defaultMessage='Logistics Accounts'>
        {text => text}
      </FormattedMessage>
    ),
    width: 150
  },
  {
    name: 'reviewRequested',
    title: (
      <FormattedMessage id='global.reviewRequested' defaultMessage='Review Requested'>
        {text => text}
      </FormattedMessage>
    ),
    width: 150
  },
  {
    name: 'nacdMember',
    title: (
      <FormattedMessage id='global.nacdMember' defaultMessage='NACD Member'>
        {text => text}
      </FormattedMessage>
    ),
    width: 130
  },
  {
    name: 'enabled',
    title: (
      <FormattedMessage id='global.enabled' defaultMessage='Enabled'>
        {text => text}
      </FormattedMessage>
    ),
    width: 130
  }
]

class CompaniesTable extends Component {
  getRows = rows => {
    return rows.map(row => {
      return {
        ...row,
        reviewRequested: (
          <Checkbox
            key={`review${row.id}`}
            toggle={true}
            defaultChecked={row.reviewRequested}
            onClick={() => this.props.reviewRequest(row.id)}
            data-test={`admin_company_table_${row.id}_chckb`}
          />
        ),
        enabled: (
          <Checkbox
            key={`enabled${row.id}`}
            toggle={true}
            defaultChecked={row.enabled}
            onClick={() => this.handleEnabled(row.rawData)}
            data-test={`admin_company_table_enable_${row.id}_chckb`}
          />
        )
      }
    })
  }

  handleEnabled = async row => {
    const { datagrid, udpateEnabled } = this.props

    try {
      await udpateEnabled(row.id, !row.enabled)
      datagrid.updateRow(row.id, () => ({ ...row, enabled: !row.enabled }))
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const {
      datagrid,
      rows,
      filterValue,
      loading,
      openEditCompany,
      confirmMessage,
      handleOpenConfirmPopup,
      deleteCompany,
      openRegisterDwollaAccount,
      takeOverCompany,
      resendWelcomeEmail,
      intl,
      currentAddForm,
      currentEditForm,
      isOpenSidebar
    } = this.props

    const { formatMessage } = intl

    return (
      <React.Fragment>
        <ProdexTable
          {...datagrid.tableProps}
          tableName='admin_companies'
          columns={columns}
          defaultSorting={{ columnName: 'displayName', direction: 'asc', sortPath: 'Company.name' }}
          rows={this.getRows(rows)}
          rowActions={[
            {
              text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
              callback: row => openEditCompany(row.id, row.rawData)
            },
            {
              text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
              callback: row =>
                confirm(
                  formatMessage({ id: 'confirm.deleteCompany.title', defaultMessage: 'Delete Company?' }),
                  formatMessage(
                    {
                      id: 'confirm.deleteCompany.content',
                      defaultMessage: `Do you really want to delete '${row.name}' company?`
                    },
                    { name: row.name }
                  )
                ).then(() => {
                  try {
                    deleteCompany(row.id)
                    datagrid.removeRow(row.id)
                  } catch (err) {
                    console.error(err)
                  }
                })
            },
            {
              text: formatMessage({ id: 'admin.registerDwollaAccount', defaultMessage: 'Register Dwolla Account' }),
              callback: async row => {
                Router.push(`/admin/dwolla-register?companyId=${row.id}`)
              },
              hidden: row => row.hasDwollaAccount === 'Yes'
            },
            {
              text: <FormattedMessage id='admin.takeOver' defaultMessage='Take-over as Company Admin' />,
              callback: row => takeOverCompany(row.id),
              hidden: row => !row.primaryUser
            },
            {
              text: <FormattedMessage id='admin.resendWelcomeEmail' defaultMessage='Resend Welcome Email' />,
              callback: async row => {
                const { value } = await resendWelcomeEmail(row.primaryUser.id)
              },
              hidden: row => !row.reviewRequested || !row.primaryUser
            }
          ]}
        />
        {isOpenSidebar && <AddEditCompanySidebar />}
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ admin, companiesAdmin }, { datagrid }) => {
  return {
    isOpenSidebar: companiesAdmin.isOpenSidebar,
    companyListDataRequest: companiesAdmin.companyListDataRequest,
    filterValue: companiesAdmin.filterValue,
    rows: datagrid.rows.map(c => ({
      rawData: c,
      ...c,
      displayName: getSafe(() => c.cfDisplayName, '') ? c.cfDisplayName : getSafe(() => c.name, ''),
      associations: (
        <ArrayToFirstItem values={getSafe(() => c.associations, '') ? c.associations.map(r => r.name) : []} />
      ),
      hasLogisticsAccounts: getSafe(() => c.logisticsAccount, false) ? 'Yes' : 'No',
      hasDwollaAccount: getSafe(() => c.dwollaAccountStatus, false) === 'verified' ? 'Yes' : 'No',
      primaryBranchAddress: getSafe(() => c.primaryBranch.deliveryAddress.address, false)
        ? c.primaryBranch.deliveryAddress.address.streetAddress +
          ', ' +
          c.primaryBranch.deliveryAddress.address.city +
          ', ' +
          (c.primaryBranch.deliveryAddress.address.province
            ? c.primaryBranch.deliveryAddress.address.province.name + ', '
            : '') +
          (c.primaryBranch.deliveryAddress.address.country ? c.primaryBranch.deliveryAddress.address.country.name : '')
        : '',
      primaryContact: getSafe(() => c.primaryUser.name, ''),
      contactEmail: getSafe(() => c.primaryUser.email, ''),
      reviewRequested: getSafe(() => c.reviewRequested, ''),
      hasLogo: getSafe(() => c.hasLogo, ''),
      nacdMember: c && c.nacdMember ? 'Yes' : c && c.nacdMember === false ? 'No' : '',
      enabled: getSafe(() => c.enabled, false)
    }))
  }
}

export default withDatagrid(connect(mapStateToProps, Actions)(injectIntl(CompaniesTable)))
