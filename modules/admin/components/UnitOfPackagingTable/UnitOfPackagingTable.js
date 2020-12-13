import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import confirm from '~/src/components/Confirmable/confirm'
import ProdexTable from '~/components/table'
import ActionCell from '~/components/table/ActionCell'
import {
  getDataRequest,
  openEditPopup,
  closeConfirmPopup,
  deleteConfirmation,
  deleteUnitOfPackaging,
  getMeasureTypesDataRequest
} from '../../actions'
import { withDatagrid } from '~/modules/datagrid'

class UnitOfPackagingTable extends Component {
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
          sortPath: 'PackagingType.name',
          allowReordering: false
        },
        {
          name: 'measureType',
          title: (
            <FormattedMessage id='global.measureType' defaultMessage='Measure Type'>
              {text => text}
            </FormattedMessage>
          ),
          sortPath: 'PackagingType.measureType.name'
        }
      ]
    }
  }
  componentDidMount() {
    this.props.getMeasureTypesDataRequest()
  }

  getActions = () => {
    const { intl, openEditPopup, deleteUnitOfPackaging, datagrid } = this.props

    const { formatMessage } = intl

    return [
      { text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }), callback: row => openEditPopup(row) },
      {
        text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
        callback: row =>
          confirm(
            formatMessage({ id: 'confirm.deletePackaging.title', defaultMessage: 'Delete Unit of Packaging' }),
            formatMessage(
              {
                id: 'confirm.deletePackaging.content',
                defaultMessage: `Do you really want to delete '${row.name}' unit?`
              },
              { name: row.name }
            )
          ).then(async () => {
            try {
              await deleteUnitOfPackaging(row.id)
              datagrid.removeRow(row.id)
            } catch (e) {
              console.error(e)
            }
          })
      }
    ]
  }

  getRows = rows => {
    return rows.map(row => {
      return {
        ...row,
        name: (
          <ActionCell
            row={row}
            getActions={this.getActions}
            content={row.name}
            onContentClick={() => this.props.openEditPopup(row)}
          />
        )
      }
    })
  }

  render() {
    const { loading, rows, datagrid, filterValue } = this.props

    const { tableName } = this.props.config

    return (
      <div className='flex stretched listings-wrapper'>
        <ProdexTable
          tableName={tableName}
          {...datagrid.tableProps}
          filterValue={filterValue}
          loading={datagrid.loading || loading}
          columns={this.state.columns}
          rows={this.getRows(rows)}
        />
      </div>
    )
  }
}

const mapDispatchToProps = {
  getDataRequest,
  deleteUnitOfPackaging,
  openEditPopup,
  closeConfirmPopup,
  deleteConfirmation,
  getMeasureTypesDataRequest
}

const mapStateToProps = (state, { datagrid }) => {
  let cfg = state.admin.config['packaging-types']
  return {
    config: cfg,
    rows: datagrid.rows.map(d => {
      return {
        id: d.id,
        name: d.name,
        nameAbbreviation: d.nameAbbreviation,
        measureType: d.measureType.name,
        measureTypeId: d.measureType.id,
        length: d.length,
        width: d.width,
        height: d.height,
        palletPkgMax: d.palletPkgMax,
        palletPkgMin: d.palletPkgMin
      }
    }),
    filterValue: state.admin.filterValue,
    loading: state.admin.loading,
    confirmMessage: state.admin.confirmMessage,
    deleteRowById: state.admin.deleteRowById
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(UnitOfPackagingTable)))
