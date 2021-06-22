import PropTypes from 'prop-types'
// Components
import ProdexTable from '../../../../components/table'
// Constants
import { COLUMNS } from './Carriers.constants'
// Services
import { getRows } from './Carriers.services'

const Carriers = props => {
  const { loading, updating, rows, datagrid, filterValue } = props

  return (
    <div className='flex stretched listings-wrapper'>
      <ProdexTable
        tableName='admin_carriers'
        {...datagrid.tableProps}
        filterValue={filterValue}
        loading={datagrid.loading || loading || updating}
        columns={COLUMNS}
        rows={getRows(rows, props)}
      />
    </div>
  )
}

Carriers.propTypes = {
  rows: PropTypes.array,
  filterValue: PropTypes.string,
  openPopup: PropTypes.func,
  deleteCarrier: PropTypes.func,
  loading: PropTypes.bool,
  updating: PropTypes.bool,
  datagrid: PropTypes.object,
  intl: PropTypes.object
}

Carriers.defaultValues = {
  rows: [],
  filterValue: '',
  openPopup: () => {},
  deleteCarrier: () => {},
  loading: false,
  updating: false,
  datagrid: {},
  intl: {}
}

export default Carriers
