import { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import ProdexGrid from '~/components/table'
import ActionCell from '~/components/table/ActionCell'
import { withDatagrid } from '~/modules/datagrid'
import { FormattedMessage, injectIntl } from 'react-intl'
import { openSidebar, deleteBranch, getBranch } from '../../../actions'
import Router from 'next/router'
import { generateToastMarkup } from '~/utils/functions'
import { withToastManager } from 'react-toast-notifications'
import { Popup, Icon } from 'semantic-ui-react'
import { getSafe } from '~/utils/functions'

import confirm from '~/components/Confirmable/confirm'
import { FormattedPhone } from '~/components/formatted-messages/'

import styled from 'styled-components'
const DivIcons = styled.div`
  position: -webkit-sticky !important;
  position: sticky !important;
  right: 0px !important;
  float: right !important;
  display: flex !important;
  margin-left: 10px !important;
`

class PickUpLocationsTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columns: [
        {
          name: 'addressName',
          title: (
            <FormattedMessage id='settings.pickupLocation' defaultMessage='Warehouse'>
              {text => text}
            </FormattedMessage>
          ),
          width: 250,
          sortPath: 'Branch.deliveryAddress.addressName',
          allowReordering: false
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
      addressName: (
        <ActionCell
          row={r}
          getActions={this.getActions}
          content={r.addressName}
          onContentClick={() => this.props.openSidebar(r.rawData, 0)}
          rightAlignedContent={
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
          }
        />
      )
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
    const { filterValue, rows, datagrid, loading, editedId } = this.props

    return (
      <Fragment>
        <div className='flex stretched listings-wrapper'>
          <ProdexGrid
            tableName='settings_pickup_locations'
            {...datagrid.tableProps}
            filterValue={filterValue}
            columns={this.state.columns}
            loading={datagrid.loading || loading}
            rows={this.getRows(rows)}
            style={{ marginTop: '5px' }}
            editingRowId={editedId}
          />
        </div>
      </Fragment>
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
        addressName: getSafe(() => r.deliveryAddress.cfName, ''),
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
