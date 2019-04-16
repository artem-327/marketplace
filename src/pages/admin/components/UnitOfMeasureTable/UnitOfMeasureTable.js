import React, { Component } from 'react'
import { connect } from 'react-redux'
//import ProdexGrid from '~/components/table'
import ProdexTable from '~/components/table'
import { getDataRequest, openEditPopup, deleteItem, getMeasureTypesDataRequest } from '../../actions'
import { Confirm } from "semantic-ui-react"

class UnitOfMeasureTable extends Component {
  componentDidMount() {
    this.props.getDataRequest(this.props.config.api)
    this.props.getMeasureTypesDataRequest();
  }

  render() {
    const {
      config,
      rows,
      filterValue,
      currentTab,
      openEditPopup,
      deleteItem,
    } = this.props

    const { columns } = this.props.config.display

    return (
      <React.Fragment>
        <ProdexTable
          filterValue={filterValue}
          columns={columns}
          rows={rows}
          rowActions={[
            { text: 'Edit', callback: (row) => openEditPopup(config, row) },
            { text: 'Delete', callback: (row) => deleteItem(config, row.id) }
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  getDataRequest,
  openEditPopup,
  deleteItem,
  getMeasureTypesDataRequest
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnitOfMeasureTable)