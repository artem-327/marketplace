import React, { Component } from 'react'
import { connect } from 'react-redux'
import confirm from '~/src/components/Confirmable/confirm'
import { injectIntl } from 'react-intl'
import { withDatagrid } from '~/modules/datagrid'
import ProdexTable from '~/components/table'
import { Checkbox } from 'semantic-ui-react'
import { getSafe, generateToastMarkup } from '~/utils/functions'
import { withToastManager } from 'react-toast-notifications'
import { FormattedMessage } from 'react-intl'
import Router from 'next/router'

import * as Actions from '../../actions'


class CompaniesTable extends Component {

  getRows = (rows) => {
    return rows.map((row) => {
      return {
        ...row,
        reviewRequested: <Checkbox key={`review${row.id}`}
          toggle={true}
          defaultChecked={row.reviewRequested}
          onClick={() => this.props.reviewRequest(row.id)}
          data-test={`admin_company_table_${row.id}_chckb`} />
      }
    })
  }

  render() {
    const {
      datagrid,
      columns,
      rows,
      filterValue,
      loading,
      openEditCompany,
      confirmMessage,
      handleOpenConfirmPopup,
      // closeConfirmPopup,
      // deleteRowById,
      deleteCompany,
      openRegisterDwollaAccount,
      takeOverCompany,
      resendWelcomeEmail,
      intl,
      toastManager
    } = this.props

    const { formatMessage } = intl

    return (
      <React.Fragment>
        <ProdexTable
          {...datagrid.tableProps}
          tableName='admin_companies'
          columns={columns}
          rows={this.getRows(rows)}
          rowActions={[
            { text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }), callback: (row) => openEditCompany(row.id, row) },
            {
              text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }), callback: (row) => confirm(
                formatMessage({ id: 'confirm.deleteCompany.title', defaultMessage: 'Delete Company?' }),
                formatMessage({ id: 'confirm.deleteCompany.content', defaultMessage: `Do you really want to delete '${row.name}' company?` }, { name: row.name })
              ).then(() => {
                deleteCompany(row.id)
                datagrid.removeRow(row.id)
              })
            },
            {
              text: formatMessage({ id: 'admin.registerDwollaAccount', defaultMessage: 'Register Dwolla Account' }), callback: async (row) => {
                Router.push(`/admin/dwolla-register?companyId=${row.id}`)
              }, hidden: row => row.hasDwollaAccount === 'Yes'
            },
            {
              text: <FormattedMessage id='admin.takeOver' defaultMessage='Take-over as Company Admin' />,
              callback: (row) => takeOverCompany(row.id),
              hidden: row => !row.primaryUser
            },
            {
              text: <FormattedMessage id='admin.resendWelcomeEmail' defaultMessage='Resend Welcome Email' />,
              callback: async (row) => {
                const { value } = await resendWelcomeEmail(row.primaryUser.id)

                toastManager.add(generateToastMarkup(
                  null,
                  value.clientMessage
                ), {
                  appearance: 'success'
                })
              },
              hidden: row => !row.reviewRequested || !row.primaryUser
            }
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ admin }, { datagrid }) => {
  return {
    columns: admin.config[admin.currentTab.name].display.columns,
    companyListDataRequest: admin.companyListDataRequest,
    filterValue: admin.filterValue,
    currentTab: admin.currentTab,
    rows: datagrid.rows.map(c => ({
      ...c,
      hasLogisticsAccounts: c.logisticsAccount ? 'Yes' : 'No',
      hasDwollaAccount: c.dwollaAccountStatus === 'verified' ? 'Yes' : 'No',
      primaryBranchAddress: getSafe(() => c.primaryBranch.deliveryAddress.address, false) ?
        c.primaryBranch.deliveryAddress.address.streetAddress + ', ' +
        c.primaryBranch.deliveryAddress.address.city + ', ' +
        (c.primaryBranch.deliveryAddress.address.province ? c.primaryBranch.deliveryAddress.address.province.name + ', ' : '') +
        (c.primaryBranch.deliveryAddress.address.country ? c.primaryBranch.deliveryAddress.address.country.name : '')
        : '',
      primaryContact: c.primaryUser ?
        c.primaryUser.name
        : '',
      contactEmail: c.primaryUser ?
        c.primaryUser.email
        : '',
      reviewRequested: c.reviewRequested,
      hasLogo: c.hasLogo
    })),
    confirmMessage: admin.confirmMessage,
    deleteRowById: admin.deleteRowById,
  }
}

export default withDatagrid(connect(mapStateToProps, Actions)(injectIntl(withToastManager(CompaniesTable))))