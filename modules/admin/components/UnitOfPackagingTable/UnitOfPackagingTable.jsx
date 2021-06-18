import { Component, useEffect } from 'react'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import confirm from '../../../../components/Confirmable/confirm'
import ProdexTable from '../../../../components/table'
import ActionCell from '../../../../components/table/ActionCell'
import {
  getDataRequest,
  openEditPopup,
  closeConfirmPopup,
  deleteConfirmation,
  deleteUnitOfPackaging,
  getMeasureTypesDataRequest,
  getAllUnitsOfMeasuresDataRequest, postNewRequest
} from '../../actions'
import {
  getProductForms,
  getProductConditions,
  getProductGrades,
  getPackagingTypes
} from '../../../global-data/actions'
import { withDatagrid } from '../../../datagrid'

const UnitOfPackagingTable = props => {
  const columns = [
    {
      name: 'name',
      title: (
        <FormattedMessage id='global.name' defaultMessage='Name' />
      ),
      sortPath: 'PackagingType.name',
      allowReordering: false
    },
    {
      name: 'measureType',
      title: (
        <FormattedMessage id='global.measureType' defaultMessage='Measure Type' />
      ),
      sortPath: 'PackagingType.measureType.name'
    }
  ]

  useEffect(() => {
    props.getMeasureTypesDataRequest()
    props.getAllUnitsOfMeasuresDataRequest()
  }, [])

  const getActions = () => {
    const { intl, openEditPopup, deleteUnitOfPackaging, datagrid, config } = props

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
              if (config.globalReload) props[config.globalReload]()
              datagrid.removeRow(row.id)
            } catch (e) {
              console.error(e)
            }
          })
      }
    ]
  }

  const getRows = rows => {
    return rows.map(row => {
      return {
        ...row,
        name: (
          <ActionCell
            row={row}
            getActions={getActions}
            content={row.name}
            onContentClick={() => props.openEditPopup(row)}
          />
        )
      }
    })
  }

  const { loading, rows, datagrid, filterValue } = props

  const { tableName } = props.config

  return (
    <div className='flex stretched listings-wrapper'>
      <ProdexTable
        tableName={tableName}
        {...datagrid.tableProps}
        filterValue={filterValue}
        loading={datagrid.loading || loading}
        columns={columns}
        rows={getRows(rows)}
      />
    </div>
  )
}

const mapDispatchToProps = {
  getDataRequest,
  deleteUnitOfPackaging,
  openEditPopup,
  closeConfirmPopup,
  deleteConfirmation,
  getMeasureTypesDataRequest,
  getAllUnitsOfMeasuresDataRequest,
  getProductForms,
  getProductConditions,
  getProductGrades,
  getPackagingTypes
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
        palletPkgMin: d.palletPkgMin,
        weight: d.weight,
        weightUnit: d.weightUnit,
        dimensionUnit: d.dimensionUnit
      }
    }),
    filterValue: state.admin.filterValue,
    loading: state.admin.loading,
    confirmMessage: state.admin.confirmMessage,
    deleteRowById: state.admin.deleteRowById
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(UnitOfPackagingTable)))
