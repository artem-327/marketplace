import React, { Component } from 'react'
import ProdexGrid from '~/components/table'
import { connect } from 'react-redux'
import { withDatagrid } from '~/modules/datagrid'
import { injectIntl } from 'react-intl'
import { deleteClientCompany, openPopup, openCompanyEdit } from '../../actions'
import { reviewRequest } from '~/modules/admin/actions'
import { FormattedMessage } from 'react-intl'
import confirm from '~/src/components/Confirmable/confirm'
import { getSafe, getFormattedAddress } from '~/utils/functions'
import { ArrayToFirstItem } from '~/components/formatted-messages/'
import { Checkbox } from 'semantic-ui-react'

const columns = [
  {
    name: 'displayName',
    title: (
      <FormattedMessage id='global.companyName' defaultMessage='Company Name'>
        {text => text}
      </FormattedMessage>
    ),
    sortPath: 'ClientCompany.cfDisplayName',
    width: 210
  },
  {
    name: 'companyAdmin',
    title: (
      <FormattedMessage id='global.companyAdmin' defaultMessage='Company Admin'>
        {text => text}
      </FormattedMessage>
    ),
    //sortPath: 'ClientCompany.primaryUser.name',
    width: 170
  },
  {
    name: 'associations',
    title: (
      <FormattedMessage id='global.associations' defaultMessage='Associations'>
        {text => text}
      </FormattedMessage>
    ),
    //sortPath: 'ClientCompany.associations',
    width: 200
  },
  {
    name: 'adminEmail',
    title: (
      <FormattedMessage id='global.adminEmail' defaultMessage='Admin Email'>
        {text => text}
      </FormattedMessage>
    ),
    //sortPath: 'ClientCompany.primaryUser.email',
    width: 210
  },
  {
    name: 'primaryBranchAddress',
    title: (
      <FormattedMessage id='global.primaryBranch2' defaultMessage='Primary Branch'>
        {text => text}
      </FormattedMessage>
    ),
    //sortPath: 'ClientCompany.primaryBranch.deliveryAddress.cfName',
    width: 350
  },
  {
    name: 'reviewRequested',
    title: (
      <FormattedMessage id='global.reviewRequested' defaultMessage='Review Requested'>
        {text => text}
      </FormattedMessage>
    ),
    align: 'center',
    width: 150
  }
]

class GuestCompaniesTable extends Component {

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
            data-test={`guest_company_table_review_requested_${row.id}_chckb`}
          />
        )
      }
    })
  }

  render() {
    const {
      datagrid,
      rows,
      intl,
      openPopup,
      deleteClientCompany,
      openCompanyEdit,
      loading
    } = this.props
    const { formatMessage } = intl

    return (
      <ProdexGrid
        {...datagrid.tableProps}
        loading={datagrid.loading || loading}
        tableName='manage_guests_client_companies'
        rows={this.getRows(rows)}
        columns={columns}
        rowActions={[
          {
            text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
            callback: row => openCompanyEdit(row.rawData)
          },
          {
            text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
            callback: row =>
              confirm(
                formatMessage({ id: 'confirm.deleteClientCompany', defaultMessage: 'Delete Guest Company' }),
                formatMessage(
                  { id: 'confirm.deleteItem', defaultMessage: `Do you really want to delete ${row.displayName}?` },
                  { item: row.displayName }
                )
              ).then(async () => {
                try {
                  await deleteClientCompany(row.id)
                  datagrid.removeRow(row.id)
                } catch (e) {
                  console.log('DELETE ERROR')
                }
              })
          }
        ]}
      />
    )
  }
}

const mapDispatchToProps = {
  deleteClientCompany,
  openPopup,
  openCompanyEdit,
  reviewRequest
}

const mapStateToProps = ({ manageGuests }, { datagrid }) => {
  return {
    ...manageGuests,
    rows: datagrid.rows.map(c => ({
      rawData: c,
      ...c,
      displayName: (
        <div
          style={{ fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >{getSafe(() => c.cfDisplayName, '')}</div>
      ),
      companyAdmin: getSafe(() => c.primaryUser.name, ''),
      associations: (
        <ArrayToFirstItem values={getSafe(() => c.associations, []).map(r => r.name)} />
      ),
      adminEmail: getSafe(() => c.primaryUser.email, ''),
      primaryBranchAddress: getSafe(() => c.primaryBranch.deliveryAddress.cfName, ''),
      reviewRequested: getSafe(() => c.reviewRequested, false),
    }))
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(GuestCompaniesTable)))
