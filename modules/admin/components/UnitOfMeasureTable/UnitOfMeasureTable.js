import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import confirm from '~/src/components/Confirmable/confirm'
//import ProdexGrid from '~/components/table'
import ProdexTable from '~/components/table'
import {
  getDataRequest,
  openEditPopup,
  closeConfirmPopup,
  deleteConfirmation,
  getMeasureTypesDataRequest,
  deleteUnit
} from '../../actions'
import { withDatagrid } from '~/modules/datagrid'

class UnitOfMeasureTable extends Component {
  componentDidMount() {
    this.props.getMeasureTypesDataRequest()
  }

  render() {
    const {
      intl,
      loading,
      rows,
      datagrid,
      filterValue,
      openEditPopup,
      deleteUnit,
    } = this.props

    const { formatMessage } = intl
    const { tableName } = this.props.config
    const { columns } = this.props.config.display

    return (
      <React.Fragment>
        <ProdexTable
          tableName={tableName}
          {...datagrid.tableProps}
          filterValue={filterValue}
          loading={datagrid.loading || loading}
          columns={columns}
          rows={rows}
          rowActions={[
            { text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }), callback: (row) => openEditPopup(row) },
            {
              text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }), callback: (row) =>
                confirm(
                  formatMessage({ id: 'confirm.deleteMeasurement.title', defaultMessage: 'Delete Unit of Measure' }),
                  formatMessage(
                    { id: 'confirm.deleteMeasurement.content', defaultMessage: `Do you really want to delete '${row.name}' unit?` },
                    { name: row.name })
                ).then(() => deleteUnit(row.id))
            }
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  getDataRequest,
  openEditPopup,
  closeConfirmPopup,
  deleteConfirmation,
  getMeasureTypesDataRequest,
  deleteUnit
}

const mapStateToProps = (state, { datagrid }) => {
  let cfg = state.admin.config[state.admin.currentTab]

  return {
    config: cfg,
    rows: datagrid.rows.map(d => {
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

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(UnitOfMeasureTable)))