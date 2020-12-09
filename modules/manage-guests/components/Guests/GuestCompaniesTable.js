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
import { MoreVertical } from 'react-feather'
import { Dropdown } from 'semantic-ui-react'
import styled from 'styled-components'

const DivRow = styled.div`
  display: flex !important;

  > div {
    flex-grow: 0;
    flex-shrink: 0;
  }

  > span {
    flex-grow: 1;
    flex-shrink: 1;
  }
`

const SpanText = styled.span`
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    font-weight: bold;
    color: #2599d5;
  }
`

const RowDropdown = styled(Dropdown)`
  display: block !important;
  height: 100% !important;

  &:hover {
    font-weight: bold;
    color: #2599d5;
  }

  .dropdown.icon {
    display: none;
  }
`

const RowDropdownIcon = styled.div`
  width: 16px;
  height: 16px;
  margin: 2px 8px 2px -4px;

  svg {
    width: 16px !important;
    height: 16px !important;
    color: #848893 !important;
  }
`

class GuestCompaniesTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columns: [
        {
          name: 'displayName',
          title: (
            <FormattedMessage id='global.companyName' defaultMessage='Company Name'>
              {text => text}
            </FormattedMessage>
          ),
          sortPath: 'ClientCompany.cfDisplayName',
          width: 210,
          allowReordering: false
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
    }
  }

  getActionItems = (actions = [], row) => {
    if (!getSafe(() => actions.length, false)) return
    return actions.map((a, i) =>
      'hidden' in a && typeof a.hidden === 'function' && a.hidden(row) ? null : (
        <Dropdown.Item
          data-test={`action_${row.id}_${i}`}
          key={i}
          text={typeof a.text !== 'function' ? a.text : a.text(row)}
          disabled={getSafe(() => a.disabled(row), false)}
          onClick={() => a.callback(row)}
        />
      )
    )
  }

  getRows = rows => {
    return rows.map(row => {
      return {
        ...row,
        displayName: (
          <DivRow>
            <RowDropdown
              trigger={
                <RowDropdownIcon>
                  <MoreVertical />
                </RowDropdownIcon>
              }>
              <Dropdown.Menu>{this.getActionItems(this.getActionsByRow(row), row)}</Dropdown.Menu>
            </RowDropdown>
            <SpanText onClick={() => this.props.openCompanyEdit(row.rawData)}>
              {row.displayName}
            </SpanText>
          </DivRow>
        ),
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

  getActionsByRow = () => {
    const {
      datagrid,
      intl,
      deleteClientCompany,
      openCompanyEdit
    } = this.props
    const { formatMessage } = intl

    return [
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
              {
                id: 'confirm.deleteItem',
                defaultMessage: `Do you really want to delete '${row.rawData.cfDisplayName}'?`
              },
              { item: row.rawData.cfDisplayName }
            )
          ).then(async () => {
            try {
              await deleteClientCompany(row.id)
              datagrid.removeRow(row.id)
            } catch (e) {
              console.error(e)
            }
          })
      }
    ]
  }

  render() {
    const {
      datagrid,
      rows,
      intl,
      loading
    } = this.props

    return (
      <div className='flex stretched listings-wrapper'>
        <ProdexGrid
          {...datagrid.tableProps}
          loading={datagrid.loading || loading}
          tableName='manage_guests_client_companies'
          rows={this.getRows(rows)}
          columns={this.state.columns}
        />
      </div>
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
