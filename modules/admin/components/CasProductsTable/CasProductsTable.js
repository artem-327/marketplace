import React, { Component } from "react"
import { connect } from "react-redux"
import { Popup, Label } from 'semantic-ui-react'
import ProdexTable from '~/components/table'
import {
  getCasProductByFilter,
  openPopup,
  openEditAltNamesCasPopup,
  casDeleteItem,
  handleOpenConfirmPopup,
  closeConfirmPopup,
  getHazardClassesDataRequest,
  getPackagingGroupsDataRequest,
  deleteCasProduct
} from '../../actions'
import { withDatagrid } from '~/modules/datagrid'

class CasProductsTable extends Component {

  getNextPage = (pageNumber) => {
    const { getCasProductByFilter, casListDataRequest, filterCasIds } = this.props

    let filter = {}
    if (filterCasIds && filterCasIds.length) {
      filter = {
        filters: [{
          operator: "EQUALS",
          path: "CasProduct.id",
          values: filterCasIds.map(casId => {
            return casId
          })
        }]
      }
    }

    getCasProductByFilter({
      ...casListDataRequest,
      ...filter,
      pageNumber
    })
  }

  initialLoad = () => {
    const { getCasProductByFilter, casListDataRequest, filterCasIds } = this.props

    let filter = {}
    if (filterCasIds && filterCasIds.length) {
      filter = {
        filters: [{
          operator: "EQUALS",
          path: "CasProduct.id",
          values: filterCasIds.map(casId => {
            return casId
          })
        }]
      }
    }

    this.props.datagrid.setFilter(filter.filters)
  }

  componentDidMount() {
    // this.getNextPage(0)
    this.initialLoad()

    this.props.getHazardClassesDataRequest()
    this.props.getPackagingGroupsDataRequest()
  }

  render() {
    const {
      config,
      loading,
      rows,
      openPopup,
      openEditAltNamesCasPopup,
      deleteCasProduct,
      // handleOpenConfirmPopup,
      // filterValue,
      // currentTab,
      // casDeleteItem,
      // reloadFilter,
      // confirmMessage,
      // closeConfirmPopup,
      // deleteRowById
    } = this.props

    const { columns } = config.display

    return (
      <React.Fragment>
        <ProdexTable
          tableName='admin_cas_products'
          loading={loading}
          columns={columns}
          onScrollToEnd={this.props.datagrid.loadNextPage}
          rows={rows}
          rowActions={[
            { text: 'Edit', callback: (row) => openPopup(row) },
            { text: 'Edit Alternative Names', callback: (row) => openEditAltNamesCasPopup(row) },
            { text: 'Delete', callback: (row) => deleteCasProduct(row.id) }
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  getCasProductByFilter,
  openPopup,
  openEditAltNamesCasPopup,
  casDeleteItem,
  handleOpenConfirmPopup,
  closeConfirmPopup,
  getHazardClassesDataRequest,
  getPackagingGroupsDataRequest,
  deleteCasProduct
}

const transformHazardClasses = classes => (
  <Label.Group color='blue'>
    {classes.map((b, i) => <Popup content={b.description} trigger={<Label size='tiny' key={i}>{b.classCode}</Label>} />)}
  </Label.Group>
)

const mapStateToProps = (state, { datagrid }) => {
  let cfg = state.admin.config[state.admin.currentTab]
  return {
    config: cfg,
    filterCasIds: state.admin.filterCasIds,
    filterValue: state.admin.filterValue,
    currentTab: state.admin.currentTab,
    casListDataRequest: state.admin.casListDataRequest,
    loading: datagrid.loading, // state.admin.loading,
    rows: datagrid.rows.map(d => {
      return {
        id: d.id,
        casIndexName: d.casIndexName,
        casNumber: d.casNumber,
        chemicalName: d.chemicalName,
        packagingGroup: !!d.packagingGroup ? d.packagingGroup.groupCode : '',
        unNumberCode: !!d.unNumber ? d.unNumber.unNumberCode : '',
        unNumberId: !!d.unNumber ? d.unNumber.id : '',
        unNumber: !!d.unNumber ? {
          id: d.unNumber.id,
          title: d.unNumber.unNumberCode,
          description: d.unNumber.description
        } : null,
        hazardClasses: transformHazardClasses(d.hazardClasses),
        // Prepare initial values for editing form
        packagingGroupId: !!d.packagingGroup ? d.packagingGroup.id : '',
        hazardClassesId: !!d.hazardClasses ? (d.hazardClasses.map(a => a.id)) : [],
      }
    }),
    // reloadFilter is used to reload CAS Product list after Edit / Add new CAS Product
    reloadFilter: {
      props: {
        currentTab: state.admin.currentTab,
        casListDataRequest: state.admin.casListDataRequest
      },
      value: state.admin.filterValue
    },
    confirmMessage: state.admin.confirmMessage,
    deleteRowById: state.admin.deleteRowById,
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(CasProductsTable), { 
  apiUrl: '/prodex/api/cas-products/datagrid' 
})