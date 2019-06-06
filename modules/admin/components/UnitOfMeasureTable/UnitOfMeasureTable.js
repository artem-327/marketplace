import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Confirm } from "semantic-ui-react"
//import ProdexGrid from '~/components/table'
import ProdexTable from '~/components/table'
import {
  getDataRequest,
  openEditPopup,
  handleOpenConfirmPopup,
  closeConfirmPopup,
  deleteConfirmation,
  getMeasureTypesDataRequest,
  deleteUnit
} from '../../actions'

class UnitOfMeasureTable extends Component {
  componentDidMount() {
    this.props.getDataRequest(this.props.config)
    this.props.getMeasureTypesDataRequest();
  }

  render() {
    const {
      loading,
      rows,
      filterValue,
      openEditPopup,
      deleteUnit,
      // handleOpenConfirmPopup,
      // config,
      // currentTab,
      // confirmMessage,
      // closeConfirmPopup,
      // deleteConfirmation,
      // deleteRowById
    } = this.props

    const { columns } = this.props.config.display

    return (
      <React.Fragment>
        <ProdexTable
          filterValue={filterValue}
          loading={loading}
          columns={columns}
          rows={rows}
          rowActions={[
            { text: 'Edit', callback: (row) => openEditPopup(row) },
            { text: 'Delete', callback: (row) => deleteUnit(row.id) }
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  getDataRequest,
  openEditPopup,
  handleOpenConfirmPopup,
  closeConfirmPopup,
  deleteConfirmation,
  getMeasureTypesDataRequest,
  deleteUnit
}

const mapStateToProps = state => {
  let cfg = state.admin.config[state.admin.currentTab]
  
  return {
    config: cfg,
    rows: state.admin[cfg.api.get.dataName].map( d => {
      return {
        id: d.id,
        name: d.name,
        nameAbbreviation: d.nameAbbreviation,
        measureType: d.measureType.name,
        measureTypeId: d.measureType.id,
      }
    }),
    filterValue: state.admin.filterValue,
    currentTab: state.admin.currentTab,
    loading: state.admin.loading,
    confirmMessage: state.admin.confirmMessage,
    deleteRowById: state.admin.deleteRowById,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnitOfMeasureTable)