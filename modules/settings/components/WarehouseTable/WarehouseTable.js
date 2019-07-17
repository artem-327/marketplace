import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProdexGrid from '~/components/table'
import { withDatagrid } from '~/modules/datagrid'
import { injectIntl } from 'react-intl'
import {
  getWarehousesDataRequest,
  getBranchesDataRequest,
  openPopup,
  closeConfirmPopup,
  deleteConfirmation,
  handleOpenConfirmPopup,
  deleteBranch
} from '../../actions'
import Router from "next/router"

import { getSafe } from '~/utils/functions'

import confirm from '~/src/components/Confirmable/confirm'

class WarehouseTable extends Component {
  state = {
    columns: [
      { name: 'name', title: 'Warehouse Name' },
      { name: 'streetAddress', title: 'Street Address' },
      { name: 'city', title: 'City' },
      { name: 'provinceName', title: 'State/Province' },
      { name: 'countryName', title: 'Country' },
      { name: 'contactName', title: 'Contact Name' },
      { name: 'phone', title: 'Phone' },
      { name: 'email', title: 'E-mail' }
    ],
    tab: ''
  }

  componentDidMount() {
    this.handlerLoadPage()
  }

  handlerLoadPage() {
    const {
      currentTab
    } = this.props

    if (currentTab.type === 'warehouses') {
      this.setState({
        tab: 'warehouses'
      })
    }
    else if (currentTab.type === 'branches') {
      this.setState({
        tab: 'branches'
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    this.state.tab != nextProps.currentTab.type ? this.handlerLoadPage() : null
  }

  branchChecker() {
    if (this.state.tab === 'branches') {
      let { columns } = this.state
      return columns.map(item => {
        let obj = {}
        if (item.title === 'Warehouse Name') {
          obj['name'] = 'name'
          obj['title'] = 'Branch Name'
          return obj
        }
        return item
      })
    }
    return this.state.columns
  }

  render() {
    const {
      filterValue,
      rows,
      datagrid,
      loading,
      openPopup,
      deleteBranch,
      intl,
      currentTab,
      // closeConfirmPopup,
      // deleteConfirmation,
      // confirmMessage,
      // handleOpenConfirmPopup,
      // deleteRowById,
      // currentTab
    } = this.props

    let message = currentTab.type === 'branches'
      ? { id: 'confirm.deleteBranch', defaultMessage: 'Delete Branch' }
      : { id: 'confirm.deleteWarehouse', defaultMessage: 'Delete Warehouse' }

    const { formatMessage } = intl

    return (
      <React.Fragment>
        <ProdexGrid
          tableName="settings_werehouser_branches"
          {...datagrid.tableProps}
          filterValue={filterValue}
          columns={this.branchChecker()}
          loading={datagrid.loading || loading}
          rows={rows}
          style={{ marginTop: '5px' }}
          rowActions={[
            { text: 'Edit', callback: row => openPopup(row.popupValues) },
            {
              text: 'Delete', callback: row =>
                confirm(
                  formatMessage({ ...message }),
                  formatMessage(
                    { id: 'confirm.deleteItem', defaultMessage: `Do you really want to delete ${row.name}! ? ` },
                    { item: row.name })
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
  openPopup,
  closeConfirmPopup,
  deleteConfirmation,
  handleOpenConfirmPopup,
  deleteBranch
}

const mapStateToProps = (state, { datagrid }) => {


  return {
    rows: datagrid.rows.map(r => {
      let countryId = getSafe(() => r.address.country.id),
        hasProvinces = getSafe(() => r.address.country.hasProvinces, false),
        zip = getSafe(() => r.address.zip.zip),
        provinceId = getSafe(() => r.address.province.id),
        zipID = getSafe(() => r.address.zip.id)


      return {
        name: r.name,
        addressName: r.address && r.address.streetAddress + ", " + r.address.city,
        popupValues: {
          initialValues: {
            name: r.name,
            address: {
              streetAddress: getSafe(() => r.address.streetAddress),
              city: getSafe(() => r.address.city),
              province: provinceId,
              country: JSON.stringify({ countryId, hasProvinces }),
              zip,
            },
            contactName: r.contactName,
            contactPhone: r.contactPhone,
            contactEmail: r.contactEmail
          },
          zipID,
          countryId,
          hasProvinces,
          branchId: r.id,
        },
        countryName: getSafe(() => r.address.country.name),
        countryId,
        hasProvinces,
        provinceName: getSafe(() => r.address.province.name),
        provinceId,
        zip,
        zipID,
        contactName: r.contactName,
        phone: r.contactPhone,
        email: r.contactEmail,
        branchId: r.id,
        id: r.id,
        warehouse: r.warehouse
      }
    }),
    editPopupBoolean: state.settings.editPopupBoolean,
    addNewWarehousePopup: state.settings.addNewWarehousePopup,
    filterValue: state.settings.filterValue,
    confirmMessage: state.settings.confirmMessage,
    currentTab: Router && Router.router && Router.router.query && Router.router.query.type ?
      state.settings.tabsNames.find(tab => tab.type === Router.router.query.type) : state.settings.tabsNames[0],
    deleteRowById: state.settings.deleteRowById,
    loading: state.settings.loading
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(WarehouseTable)))
