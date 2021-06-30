import { useEffect } from 'react'
import PropTypes from 'prop-types'
// Components
import ProdexTable from '../../../../components/table'
// Services
import { columns, getRows } from './UnitOfPackagingTable.services'
import {getUnits} from "../../../global-data/actions";

/**
 * UnitOfPackagingTable Component
 * @category Admin Settings - Packaging Types
 * @components
 */
const UnitOfPackagingTable = props => {
  useEffect(() => {
    if (!props.measureOptions.length) props.getMeasureTypes()
    if (!props.units.length) props.getUnits()
  }, [])

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
        rows={getRows(rows, props)}
      />
    </div>
  )
}

UnitOfPackagingTable.propTypes = {
  getMeasureTypes: PropTypes.func,
  measureOptions: PropTypes.array,
  getUnits: PropTypes.func,
  units: PropTypes.array,
  deleteUnitOfPackaging: PropTypes.func,
  openEditPopup: PropTypes.func,
  deleteUnit: PropTypes.func,
  rows: PropTypes.array,
  filterValue: PropTypes.string,
  loading: PropTypes.bool,
  config: PropTypes.object,
  datagrid: PropTypes.object,
  intl: PropTypes.object
}

UnitOfPackagingTable.defaultValues = {
  getUnits: () => {},
  units: [],
  deleteUnitOfPackaging: () => {},
  getMeasureTypes: () => {},
  measureOptions: [],
  openEditPopup: () => {},
  deleteUnit: () => {},
  rows: [],
  filterValue: null,
  loading: false,
  config: {},
  datagrid: {},
  intl: {}
}

export default UnitOfPackagingTable
