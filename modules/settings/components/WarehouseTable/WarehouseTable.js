import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProdexGrid from '~/components/table'
import { withDatagrid } from '~/modules/datagrid'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getWarehousesDataRequest, getBranchesDataRequest, openSidebar, deleteBranch, getBranch } from '../../actions'
import Router from 'next/router'
import { generateToastMarkup } from '~/utils/functions'
import { withToastManager } from 'react-toast-notifications'
import { Popup, Icon } from 'semantic-ui-react'

import { getSafe } from '~/utils/functions'

import confirm from '~/src/components/Confirmable/confirm'
import { FormattedPhone } from '~/components/formatted-messages/'

class WarehouseTable extends Component {
  state = {
    columns: [
      {
        name: 'certificateIcon',
        title: ' ',
        width: 45,
        align: 'center'
      },
      {
        name: 'addressName',
        title: (
          <FormattedMessage id='settings.warehouseName' defaultMessage='Warehouse Name'>
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
    ],
    tab: ''
  }

  componentDidMount() {
    this.handlerLoadPage()
  }

  handlerLoadPage() {
    const { currentTab } = this.props
    let { columns } = this.state
    if (!columns) return

    if (currentTab.type === 'warehouses') {
      columns[1].title = (
        <FormattedMessage id='settings.warehouseName' defaultMessage='Warehouse Name'>
          {text => text}
        </FormattedMessage>
      )
      this.setState(prevState => ({
        tab: 'warehouses',
        columns
      }))
    } else if (currentTab.type === 'branches') {
      columns[1].title = (
        <FormattedMessage id='settings.branchName' defaultMessage='Branch Name'>
          {text => text}
        </FormattedMessage>
      )
      this.setState(prevState => ({
        tab: 'branches',
        columns
      }))
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.tab !== this.props.currentTab.type && this.props.currentTab.type !== prevProps.currentTab.type) {
      this.handlerLoadPage()
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

  render() {
    const {
      filterValue,
      rows,
      datagrid,
      loading,
      openSidebar,
      deleteBranch,
      intl,
      currentTab,
      toastManager,
      getBranch
    } = this.props

    let message =
      currentTab.type === 'branches'
        ? { id: 'confirm.deleteBranch', defaultMessage: 'Delete Branch' }
        : { id: 'confirm.deleteWarehouse', defaultMessage: 'Delete Warehouse' }

    const { formatMessage } = intl

    return (
      <React.Fragment>
        <ProdexGrid
          tableName='settings_werehouser_branches'
          {...datagrid.tableProps}
          filterValue={filterValue}
          columns={this.state.columns}
          loading={datagrid.loading}
          rows={this.getRows(rows)}
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
              text: formatMessage({ id: 'global.certificates', defaultMessage: 'Certificates' }),
              callback: row => {
                const indexTabofSidebar = 1
                getBranch(row.id)
                openSidebar(indexTabofSidebar)
              }
            },
            {
              text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
              callback: row =>
                confirm(
                  formatMessage({ ...message }),
                  formatMessage(
                    { id: 'confirm.deleteItem', defaultMessage: `Do you really want to delete ${row.name}! ? ` },
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
  getWarehousesDataRequest,
  getBranchesDataRequest,
  openSidebar,
  deleteBranch,
  getBranch
}

const mapStateToProps = (state, { datagrid }) => {
  return {
    rows: datagrid.rows.map(r => {
      let countryId = getSafe(() => r.deliveryAddress.address.country.id),
        hasProvinces = getSafe(() => r.deliveryAddress.address.country.hasProvinces, false),
        zip = getSafe(() => r.deliveryAddress.address.zip.zip),
        provinceId = getSafe(() => r.deliveryAddress.address.province.id),
        zipID = getSafe(() => r.deliveryAddress.address.zip.id)

      return {
        streetAddress: getSafe(() => r.deliveryAddress.address.streetAddress),
        city: getSafe(() => r.deliveryAddress.address.city),
        countryName: getSafe(() => r.deliveryAddress.address.country.name),
        countryId,
        hasProvinces,
        provinceName: getSafe(() => r.deliveryAddress.address.province.name),
        provinceId,
        zip,
        zipID,
        addressName: getSafe(() => r.deliveryAddress.cfName, ''),
        contactName: getSafe(() => r.deliveryAddress.contactName, ''),
        contactEmail: getSafe(() => r.deliveryAddress.contactEmail, ''),
        contactPhone: getSafe(() => r.deliveryAddress.contactPhone, ''),
        phoneFormatted: <FormattedPhone value={getSafe(() => r.deliveryAddress.contactPhone, '')} />,
        branchId: r.id,
        id: r.id,
        warehouse: r.warehouse,
        attachments: r.attachments
      }
    }),
    editPopupBoolean: state.settings.editPopupBoolean,
    addNewWarehousePopup: state.settings.addNewWarehousePopup,
    filterValue: state.settings.filterValue,
    currentTab:
      Router && Router.router && Router.router.query && Router.router.query.type
        ? state.settings.tabsNames.find(tab => tab.type === Router.router.query.type)
        : state.settings.tabsNames[0],
    loading: state.settings.loading
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(withToastManager(WarehouseTable))))
