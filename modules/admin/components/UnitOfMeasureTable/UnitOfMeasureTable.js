import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
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
  constructor(props) {
    super(props)

    this.state = {
      columns: [
        {
          name: 'name',
          title: (
            <FormattedMessage id='global.name' defaultMessage='Name'>
              {text => text}
            </FormattedMessage>
          ),
          actions: this.getActions()
        },
        {
          name: 'nameAbbreviation',
          title: (
            <FormattedMessage id='global.nameAbbreviation' defaultMessage='Name Abbreviation'>
              {text => text}
            </FormattedMessage>
          )
        },
        {
          name: 'measureType',
          title: (
            <FormattedMessage id='global.measureType' defaultMessage='Measure Type'>
              {text => text}
            </FormattedMessage>
          )
        },
        {
          name: 'ratioToBaseSiUnit',
          title: (
            <FormattedMessage id='global.ratioToBaseSiUnit' defaultMessage='Ratio to Base SI Unit'>
              {text => text}
            </FormattedMessage>
          )
        }
      ]
    }
  }
  componentDidMount() {
    this.props.getMeasureTypesDataRequest()
  }

  getActions = () => {
    const { intl, openEditPopup, deleteUnit, datagrid } = this.props

    const { formatMessage } = intl
    return [
      { text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }), callback: row => openEditPopup(row) },
      {
        text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
        callback: row =>
          confirm(
            formatMessage({ id: 'confirm.deleteMeasurement.title', defaultMessage: 'Delete Unit of Measure' }),
            formatMessage(
              {
                id: 'confirm.deleteMeasurement.content',
                defaultMessage: `Do you really want to delete '${row.name}' unit?`
              },
              { name: row.name }
            )
          ).then(async () => {
            try {
              await deleteUnit(row.id)
              datagrid.removeRow(row.id)
            } catch (e) {
              console.error(e)
            }
          })
      }
    ]
  }

  render() {
    const { loading, rows, datagrid, filterValue } = this.props

    const { tableName } = this.props.config

    return (
      <React.Fragment>
        <ProdexTable
          tableName={tableName}
          {...datagrid.tableProps}
          filterValue={filterValue}
          loading={datagrid.loading || loading}
          columns={this.state.columns}
          rows={rows}
          columnActions='name'
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
  let cfg = state.admin.config['units-of-measure']

  return {
    config: cfg,
    rows: datagrid.rows.map(d => {
      return {
        id: d.id,
        name: d.name,
        nameAbbreviation: d.nameAbbreviation,
        measureType: d.measureType.name,
        measureTypeId: d.measureType.id,
        ratioToBaseSiUnit: d.ratioToBaseSiUnit
      }
    }),
    filterValue: state.admin.filterValue,
    loading: state.admin.loading,
    confirmMessage: state.admin.confirmMessage,
    deleteRowById: state.admin.deleteRowById
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(UnitOfMeasureTable)))
