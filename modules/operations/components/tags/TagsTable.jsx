import { injectIntl } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'
import PropTypes from 'prop-types'
// Components
import ProdexTable from '../../../../components/table'
// Services
import { columns, getRows} from './Tags.services'

const TagsTable = props => {
  const { loading, rows, datagrid, filterValue } = props

  return (
    <div className='flex stretched listings-wrapper'>
      <ProdexTable
        tableName={'operations_tag'}
        {...datagrid.tableProps}
        filterValue={filterValue}
        loading={datagrid.loading || loading}
        columns={columns}
        rows={getRows(rows, props)}
      />
    </div>
  )
}

TagsTable.propTypes = {
  datagrid: PropTypes.object,
  loading: PropTypes.bool,
  filterValue: PropTypes.string, 
  rows: PropTypes.array
}

TagsTable.defaultValues = {
  datagrid: {},
  loading: false,
  filterValue: '', 
  rows: []
}

export default injectIntl(withToastManager(TagsTable))
